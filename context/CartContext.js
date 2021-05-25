import { createContext } from 'react';
export const CartContext = createContext();

//add error handling to the cart functions

const Cart = ({ children, checkoutId }) => {
  const addItemToCart = async (variantId, quantity, checkoutId) => {
    await fetch('/api/addLineItem', {
      method: 'POST',
      body: JSON.stringify({
        variantId,
        quantity,
        checkoutId,
      }),
    });
  };

  const removeItemFromCart = async (variantId, checkoutId) => {
    await fetch('/api/removeLineItem', {
      method: 'POST',
      body: JSON.stringify({
        variantId,
        checkoutId,
      }),
    });
  };

  const updateItemInCart = async (variantId, quantity, checkoutId) => {
    await fetch('/api/updateLineItem', {
      method: 'POST',
      body: JSON.stringify({
        variantId,
        quantity,
        checkoutId,
      }),
    });
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
