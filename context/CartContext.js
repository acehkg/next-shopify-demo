import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
export const CartContext = createContext();

//add error handling to the cart functions

const Cart = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState();
  const [cookies, setCookie] = useCookies();

  //retrieve existing checkout from cookies or create a new checkout
  useEffect(async () => {
    const { checkout_id } = cookies;
    let date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    try {
      if (checkout_id === undefined) {
        const res = await fetch('/api/createCheckout');
        const createdCheckout = await res.json();
        setCookie('checkout_id', createdCheckout.id, {
          expires: date,
          secure: true,
        });
        setCheckoutId(createdCheckout.id);
      } else {
        setCheckoutId(checkout_id);
      }
    } catch (e) {}
  }, []);

  const addItemToCart = async (variantId, quantity, checkoutId) => {
    try {
      await fetch('/api/addLineItem', {
        method: 'POST',
        body: JSON.stringify({
          variantId,
          quantity,
          checkoutId,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemFromCart = async (variantId, checkoutId) => {
    try {
      await fetch('/api/removeLineItem', {
        method: 'POST',
        body: JSON.stringify({
          variantId,
          checkoutId,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemInCart = async (id, variantId, quantity, checkoutId) => {
    try {
      await fetch('/api/updateLineItems', {
        method: 'POST',
        body: JSON.stringify({
          id,
          variantId,
          quantity,
          checkoutId,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemsCookie = async (checkoutId) => {
    let date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
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
  };

  const exposed = {
    checkoutId,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
    updateItemsCookie,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default Cart;
