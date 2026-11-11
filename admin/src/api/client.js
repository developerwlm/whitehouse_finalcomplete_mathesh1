import axios from "axios";

// Base URL comes from the environment, falling back to the local backend.
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

// localStorage key used to persist the admin session token.
export const TOKEN_KEY = "wh_admin_token";

const client = axios.create({ baseURL: API_URL });

// Attach the bearer token to every outgoing request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global 401 handling: clear the session and notify the auth context.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event("wh:unauthorized"));
    }
    return Promise.reject(error);
  }
);

// Normalises backend/network errors into a human readable string.
export function getErrorMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;
    if (typeof data.message === "string" && data.message) return data.message;
  }
  if (error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

export default client;
