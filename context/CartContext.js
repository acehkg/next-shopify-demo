import { createContext, useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

export const CartContext = createContext();

const Cart = ({ children }) => {
  const [cart, setCart] = useState();
  const [cookies, setCookie] = useCookies(['checkoutId']);
  //const router = useRouter();
  const createCheckout = async () => {
    let checkoutId = cookies;
    if (Object.keys(checkoutId).length === 0) {
      const createdCheckout = await fetch('/api/createCheckout');
      createdCheckout.json().then((body) => {
        setCookie('checkoutId', body.id);
        setCart(body);
      });
    } else {
      const existingCheckout = await fetch('/api/existingCheckout', {
        method: 'POST',
        body: checkoutId.checkoutId,
      });
      existingCheckout.json().then((body) => {
        setCart(body);
      });
    }
  };
  const addItemToCart = async (variantId, quantity, checkoutId) => {
    const addLineItem = await fetch('/api/addLineItem', {
      method: 'POST',
      body: JSON.stringify({
        variantId,
        quantity,
        checkoutId,
      }),
    });
  };
  const exposed = {
    createCheckout,
    cart,
    addItemToCart,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default Cart;
