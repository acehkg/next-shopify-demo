import { useState, useEffect } from 'react';

const useStorefront = (query) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeQuery = async (query) => {
    setLoading(true);
    try {
      const res = await fetch('/api/testGraph', {
        method: 'POST',
        body: query,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    makeQuery(query);
  }, []);

  return { response, error, loading };
};

export default useStorefront;
