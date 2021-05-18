import useCart from '../hooks/useCart';

export const getCheckout = () => {
  const { checkout } = useCart();
  return checkout;
};
