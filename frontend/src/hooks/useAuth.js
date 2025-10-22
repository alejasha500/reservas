import { useEffect, useState } from "react";
import { api } from "../api/axiosConfig.js";

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // evita actualizar estado si el componente se desmonta

    const getData = async () => {
      try {
        const res = await api.get(endpoint);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();
    return () => (isMounted = false); // cleanup para evitar memory leaks
  }, [endpoint]);

  return { data, loading, error };
}