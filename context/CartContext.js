import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { gql } from 'graphql-request';
export const CartContext = createContext();

const Cart = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState();
  const [itemsInCart, setItemsInCart] = useState();
  const [cookies, setCookie] = useCookies(['checkout_items', 'checkout_id']);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  let date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  //set items in cart total to display cookie value and update cookie when items in cart adjusted
  useEffect(() => {
    const { checkout_items } = cookies;
    checkout_items ? setItemsInCart(checkout_items) : setItemsInCart(0);
  }, []);

  useEffect(() => {
    itemsInCart == 0
      ? setCookie('checkout_items', 0, {
          expires: date,
          secure: true,
        })
      : setCookie('checkout_items', itemsInCart, {
          expires: date,
          secure: true,
        });
  }, [itemsInCart]);

  //retrieve existing checkout from cookies or create a new checkout
  useEffect(async () => {
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
    const { checkout_id } = cookies;
    try {
      if (checkout_id === undefined) {
        const res = await fetch('/api/storefrontMutation', {
          method: 'POST',
          body: JSON.stringify({
            QUERY,
            variables,
          }),
        });

        const { checkoutCreate } = await res.json();

        setCookie('checkout_id', checkoutCreate.checkout.id, {
          expires: date,
          secure: true,
        });
        setCheckoutId(checkoutCreate.checkout.id);
      } else {
        setCheckoutId(checkout_id);
      }
    } catch (e) {}
  }, []);

  const addItemToCart = async (variantId, quantity, checkoutId) => {
    const QUERY = gql`
      mutation checkoutLineItemsAdd(
        $lineItems: [CheckoutLineItemInput!]!
        $checkoutId: ID!
      ) {
        checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
          checkout {
            id
            lineItems(first: 250) {
              edges {
                node {
                  id
                  title
                  quantity
                }
              }
            }
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
      lineItems: [
        {
          quantity: quantity,
          variantId: variantId,
        },
      ],
      checkoutId: checkoutId,
    };
    try {
      const res = await fetch('/api/storefrontMutation', {
        method: 'POST',
        body: JSON.stringify({
          QUERY,
          variables,
        }),
      });
      const {
        checkoutLineItemsAdd: { checkout },
      } = await res.json();
      const lineItems = checkout.lineItems.edges;

      const itemsArray =
        Array.isArray(lineItems) && lineItems.length
          ? lineItems.map((item) => {
              return item.node.quantity;
            })
          : null;

      itemsArray
        ? setItemsInCart(itemsArray.reduce(reducer))
        : setItemsInCart(0);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemFromCart = async (variantId, checkoutId) => {
    const QUERY = gql`
      mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(
          checkoutId: $checkoutId
          lineItemIds: $lineItemIds
        ) {
          checkout {
            id
            lineItems(first: 250) {
              edges {
                node {
                  id
                  title
                  quantity
                }
              }
            }
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
      checkoutId: checkoutId,
      lineItemIds: [variantId],
    };
    try {
      const res = await fetch('/api/storefrontMutation', {
        method: 'POST',
        body: JSON.stringify({
          QUERY,
          variables,
        }),
      });
      const {
        checkoutLineItemsRemove: { checkout },
      } = await res.json();

      const lineItems = checkout.lineItems.edges;

      const itemsArray =
        Array.isArray(lineItems) && lineItems.length
          ? lineItems.map((item) => {
              return item.node.quantity;
            })
          : null;

      itemsArray
        ? setItemsInCart(itemsArray.reduce(reducer))
        : setItemsInCart(0);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemInCart = async (id, variantId, quantity, checkoutId) => {
    const QUERY = gql`
      mutation checkoutLineItemsUpdate(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemUpdateInput!]!
      ) {
        checkoutLineItemsUpdate(
          checkoutId: $checkoutId
          lineItems: $lineItems
        ) {
          checkout {
            id
            lineItems(first: 250) {
              edges {
                node {
                  id
                  title
                  quantity
                }
              }
            }
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
      checkoutId: checkoutId,
      lineItems: [
        {
          id: id,
          quantity: quantity,
          variantId: variantId,
        },
      ],
    };
    try {
      const res = await fetch('/api/storefrontMutation', {
        method: 'POST',
        body: JSON.stringify({
          QUERY,
          variables,
        }),
      });
      const {
        checkoutLineItemsUpdate: { checkout },
      } = await res.json();

      const lineItems = checkout.lineItems.edges;

      const itemsArray =
        Array.isArray(lineItems) && lineItems.length
          ? lineItems.map((item) => {
              return item.node.quantity;
            })
          : null;

      itemsArray
        ? setItemsInCart(itemsArray.reduce(reducer))
        : setItemsInCart(0);
    } catch (err) {
      console.log(err);
    }
  };

  const exposed = {
    checkoutId,
    itemsInCart,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default Cart;
