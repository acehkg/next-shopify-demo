import { useEffect } from 'react';
import { gql } from 'graphql-request';
import useCartContext from '../hooks/useCartContext';

const test = () => {
  const { checkoutId } = useCartContext();
  console.log(checkoutId);
  const testGraph = async (checkoutId) => {
    const QUERY = gql`
      {
        node(
          id: "${checkoutId}"
        ) {
          ... on Checkout {
            id
            webUrl
          }
        }
      }
    `;

    try {
      const res = await fetch('/api/storefrontQuery', {
        method: 'POST',
        body: JSON.stringify({
          QUERY,
        }),
      });
      const response = await res.json();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    checkoutId ? testGraph(checkoutId) : null;
  }, [checkoutId]);
  return <div>HELLO</div>;
};

export default test;
