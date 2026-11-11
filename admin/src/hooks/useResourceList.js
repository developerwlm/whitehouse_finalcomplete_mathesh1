import { useCallback, useEffect, useState } from "react";
import client, { getErrorMessage } from "../api/client";

/**
 * Loads a list from `/api/admin/<resource>` and optionally filters by `search`.
 * Returns the items plus loading/error state and a manual `reload`.
 */
export default function useResourceList(resource, search) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = search ? { search } : undefined;
      const { data } = await client.get(`/api/admin/${resource}`, { params });
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setItems([]);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [resource, search]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, loading, error, reload };
}
