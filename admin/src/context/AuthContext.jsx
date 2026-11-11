import { createContext, useCallback, useContext, useEffect, useState } from "react";
import client, { TOKEN_KEY } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }, []);

  const login = useCallback(async (username, password) => {
    const { data } = await client.post("/api/admin/login", { username, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setAdmin(data.admin);
    return data.admin;
  }, []);

  // Restore the session from a persisted token on first mount.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    let active = true;
    client
      .get("/api/admin/me")
      .then(({ data }) => {
        if (active) setAdmin(data.admin);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem(TOKEN_KEY);
          setAdmin(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // React to 401s raised by the axios interceptor.
  useEffect(() => {
    const handler = () => {
      localStorage.removeItem(TOKEN_KEY);
      setAdmin(null);
    };
    window.addEventListener("wh:unauthorized", handler);
    return () => window.removeEventListener("wh:unauthorized", handler);
  }, []);

  const value = { admin, loading, login, logout, updateAdmin: setAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
