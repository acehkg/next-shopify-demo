import { createContext } from 'react';
export const CartContext = createContext();

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
  const exposed = {
    checkoutId,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default Cart;
