import { gql } from 'graphql-request';

export const fetcherWithCheckout = async (url, checkoutId) => {
  const QUERY = gql`
      {
        node(
          id: "${checkoutId}"
        ) {
          ... on Checkout {
            id
            webUrl
            totalPriceV2{
              amount
              currencyCode
            }
            lineItems(first:250){
              edges{
                node{
                  id
                  title
                  quantity
                  variant{
                    id
                    title
                    image{
                      originalSrc
                    }
                    priceV2{
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ QUERY }),
    });
    const { node } = await res.json();
    return node;
  } catch (e) {}
};
