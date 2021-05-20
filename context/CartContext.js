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

  const exposed = {
    checkoutId,
    addItemToCart,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default Cart;
