import { useState, useEffect } from 'react';
import storefrontClient from '../utils/graphClient';

const useClient = (query, variables) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeQuery = async (query, variables) => {
    setLoading(true);
    try {
      const res = await storefrontClient.request(query, variables && variables);
      setResponse(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    makeQuery(query, variables);
    console.log(storefrontClient);
  }, []);

  return { response, error, loading };
};

export default useClient;
