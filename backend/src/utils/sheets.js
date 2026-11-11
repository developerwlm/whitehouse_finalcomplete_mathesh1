const REQUEST_TIMEOUT_MS = 15000;

function getConfig() {
  const url = String(process.env.GOOGLE_SHEET_URL || "").trim();
  const secret = String(process.env.GOOGLE_SHEET_SECRET || "").trim();

  if (!url) {
    throw new Error("GOOGLE_SHEET_URL is not configured.");
  }

  return { url, secret };
}

async function withTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Google Sheet request timed out.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function buildUrl(url, secret, action) {
  const target = new URL(url);
  target.searchParams.set("secret", secret);
  target.searchParams.set("action", action);
  return target.toString();
}

async function callSheet(url, options) {
  const response = await withTimeout(url, options);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Google Sheet request failed with status ${response.status}.`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      "The Apps Script web app did not return JSON. Add a doGet(e) function that returns JSON and publish a new deployment version."
    );
  }
}

/**
 * Appends one enquiry row to the Google Sheet through the Apps Script web app.
 */
async function appendEnquiryRow(enquiry) {
  const { url, secret } = getConfig();

  return callSheet(buildUrl(url, secret, "create"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, action: "create", ...enquiry }),
  });
}

function toText(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function toFieldMap(row) {
  const fields = {};

  Object.entries(row).forEach(([key, value]) => {
    fields[String(key).trim().toLowerCase()] = value;
  });

  return fields;
}

function toEnquiry(rawRow, index) {
  const row = toFieldMap(rawRow || {});

  return {
    id: toText(row.id || row["enquiry id"] || row.row || index + 2),
    name: toText(row.name),
    phone: toText(row.phone || row.mobile || row["phone number"]),
    email: toText(row.email || row["e-mail"]),
    city: toText(row.city),
    gender: toText(row.gender),
    course: toText(row.course || row["course interested"]),
    message: toText(row.message || row.remarks),
    source: toText(row.source),
    status: toText(row.status),
    createdAt: toText(row.createdat || row.timestamp || row.date || row["created at"]),
  };
}

/**
 * Minimal CSV parser that understands quoted fields and escaped quotes.
 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/**
 * Reads the sheet straight from its share link (the sheet must be viewable by
 * anyone with the link). No Apps Script change is needed for this channel.
 */
async function fetchSheetCsvRows() {
  const sheetId = String(process.env.GOOGLE_SHEET_ID || "").trim();
  const gid = String(process.env.GOOGLE_SHEET_GID || "").trim();

  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured.");
  }

  const target = new URL(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`);
  target.searchParams.set("tqx", "out:csv");
  if (gid) {
    target.searchParams.set("gid", gid);
  }

  const response = await withTimeout(target.toString(), { method: "GET" });

  if (response.status === 401 || response.status === 403) {
    throw new Error(
      "the sheet is private — set its sharing to “Anyone with the link can view”"
    );
  }

  if (!response.ok) {
    throw new Error(`the sheet responded with status ${response.status}`);
  }

  const csv = await response.text();

  if (csv.trim().startsWith("<")) {
    throw new Error("the sheet returned a sign-in page instead of data");
  }

  const [headerRow, ...dataRows] = parseCsv(csv);
  const headers = (headerRow || []).map((header) => String(header).trim());

  return dataRows
    .filter((row) => row.some((cell) => String(cell).trim() !== ""))
    .map((row, index) => {
      const record = {};
      headers.forEach((header, column) => {
        if (header) {
          record[header] = row[column];
        }
      });
      record.id = String(index + 2);
      return toEnquiry(record, index);
    });
}

async function fetchScriptRows() {
  const { url, secret } = getConfig();
  const payload = await callSheet(buildUrl(url, secret, "list"), { method: "GET" });

  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(payload && payload.rows)
      ? payload.rows
      : [];

  return rows.map(toEnquiry);
}

/**
 * Reads the enquiry rows for the admin UI: first through the sheet share link,
 * falling back to the Apps Script doGet when the sheet is not public.
 */
async function fetchEnquiryRows() {
  const failures = [];
  const useCsv = String(process.env.GOOGLE_SHEET_ID || "").trim() !== "";

  if (useCsv) {
    try {
      return await fetchSheetCsvRows();
    } catch (error) {
      failures.push(`sheet link: ${error.message}`);
    }
  }

  try {
    return await fetchScriptRows();
  } catch (error) {
    failures.push(`apps script: ${error.message}`);
  }

  throw new Error(`Could not read the enquiry sheet (${failures.join("; ")}).`);
}

module.exports = { appendEnquiryRow, fetchEnquiryRows };
