const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = String(process.env.SMTP_HOST || "").trim();
  const user = String(process.env.SMTP_USER || "").trim();
  const pass = String(process.env.SMTP_PASS || "").trim();

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS must be configured.");
  }

  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: { user, pass },
  });

  return transporter;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Emails one website enquiry to the academy inbox.
 */
async function sendEnquiryMail(enquiry) {
  const from = String(process.env.MAIL_FROM || process.env.SMTP_USER || "").trim();
  const to = String(process.env.MAIL_TO || process.env.SMTP_USER || "").trim();

  if (!from || !to) {
    throw new Error("MAIL_FROM and MAIL_TO must be configured.");
  }

  const rows = [
    ["Name", enquiry.name],
    ["Phone", enquiry.phone],
    ["E-mail", enquiry.email],
    ["City", enquiry.city],
    ["Gender", enquiry.gender],
    ["Course", enquiry.course],
    ["Message", enquiry.message],
    ["Source", enquiry.source],
    ["Received", enquiry.createdAt],
  ].filter(([, value]) => String(value || "").trim() !== "");

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `<h2>New enquiry from the Whitehouse website</h2><table cellpadding="6" cellspacing="0" border="0">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
    )
    .join("")}</table>`;

  return getTransporter().sendMail({
    from,
    to,
    replyTo: enquiry.email || undefined,
    subject: `New enquiry — ${enquiry.name}${enquiry.course ? ` (${enquiry.course})` : ""}`,
    text,
    html,
  });
}

module.exports = { sendEnquiryMail };
