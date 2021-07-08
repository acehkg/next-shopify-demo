import { useEffect } from 'react';
import { gql } from 'graphql-request';

const test = () => {
  const testGraph = async () => {
    const QUERY = gql`
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;
    const variables = {
      input: {},
    };

    try {
      const res = await fetch('/api/storefrontMutation', {
        method: 'POST',
        body: JSON.stringify({
          QUERY,
          variables,
        }),
      });
      const { checkoutCreate } = await res.json();

      console.log(checkout.id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    testGraph();
  }, []);
  return <div>HELLO</div>;
};

export default test;
