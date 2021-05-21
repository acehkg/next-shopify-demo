import useCart from '../../hooks/useCart';

const Cart = async ({ checkoutId }) => {
  await useCart(checkoutId);

  return <></>;
};

export default Cart;
