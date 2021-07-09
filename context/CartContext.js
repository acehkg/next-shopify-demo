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

  //set items in cart total to display in widget and set the cookie for next visit
  useEffect(() => {
    const { checkout_items } = cookies;
    checkout_items ? setItemsInCart(checkout_items) : setItemsInCart(0);
  }, []);

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

      const itemsArray = checkout.lineItems.edges.map((edge) => {
        return edge.node.quantity;
      });

      const itemsTotal = itemsArray.reduce(reducer);
      setItemsInCart(itemsTotal);
      setCookie('checkout_items', itemsTotal, {
        expires: date,
        secure: true,
      });
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

      let itemsTotal;
      console.log(checkout.lineItems.edges.length);
      if ((checkout.lineItems.edges.length = 0)) {
        itemsTotal = 0;
      } else {
        const itemsArray = checkout.lineItems.edges.map((edge) => {
          return edge.node.quantity;
        });
        itemsTotal = itemsArray.reduce(reducer);
      }

      setItemsInCart(itemsTotal);
      setCookie('checkout_items', itemsTotal, {
        expires: date,
        secure: true,
      });
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

      const itemsArray = checkout.lineItems.edges.map((edge) => {
        return edge.node.quantity;
      });

      const itemsTotal = itemsArray.reduce(reducer);
      setItemsInCart(itemsTotal);
      setCookie('checkout_items', itemsTotal, {
        expires: date,
        secure: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /*  const updateItemsCookie = async (checkoutId) => {
    let date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    try {
      const res = await fetch('/api/existingCheckout', {
        method: 'POST',
        body: checkoutId,
      });
      const oldCheckout = await res.json();
      setCookie('checkout_length', oldCheckout.lineItems.length, {
        expires: date,
        secure: true,
      });
    } catch (err) {
      console.log(err);
    }
  }; */

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
