// Single place for API configuration used by every public page.
const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_CMS_API_URL ||
  "http://localhost:4000"
).replace(/\/+$/, "");

export { API_BASE_URL };

/**
 * Turns a stored image path into something the browser can load.
 * Absolute URLs and legacy relative paths are returned untouched.
 */
export function resolveAssetUrl(value) {
  if (!value) return "";

  if (
    value.startsWith("data:") ||
    value.startsWith("//") ||
    /^https?:\/\//i.test(value) ||
    value.startsWith("../")
  ) {
    return value;
  }

  return value.startsWith("/") ? `${API_BASE_URL}${value}` : value;
}

async function requestJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function submitEnquiry(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Enquiry submission failed.");
    }

    return result;
  } catch (error) {
    console.error("Enquiry API Error:", error);
    throw error;
  }
}

export async function getCourses() {
  const data = await requestJson(`${API_BASE_URL}/api/courses`);

  return Array.isArray(data) ? data : [];
}

/** Returns null when the course does not exist so callers can fall back. */
export async function getCourseBySlug(slug) {
  const response = await fetch(
    `${API_BASE_URL}/api/courses/${encodeURIComponent(slug)}`
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getFaqs({ scope, courseSlug } = {}) {
  const params = new URLSearchParams();

  if (scope) params.set("scope", scope);

  if (courseSlug !== undefined) params.set("courseSlug", courseSlug || "");

  const query = params.toString();
  const data = await requestJson(
    `${API_BASE_URL}/api/faqs${query ? `?${query}` : ""}`
  );

  return Array.isArray(data) ? data : [];
}

export async function getBlogs() {
  const data = await requestJson(`${API_BASE_URL}/api/blogs`);

  return Array.isArray(data) ? data : [];
}

export async function getBlogBySlug(slug) {
  const response = await fetch(
    `${API_BASE_URL}/api/blogs/${encodeURIComponent(slug)}`
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
