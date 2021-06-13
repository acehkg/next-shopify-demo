import { createContext } from 'react';
export const CartContext = createContext();

//add error handling to the cart functions

const Cart = ({ children, checkoutId }) => {
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

  const exposed = {
    checkoutId,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default Cart;
