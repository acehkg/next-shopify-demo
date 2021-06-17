import useSWR from 'swr';
import { fetcherWithCheckout } from '../utils/swr';

const useCart = (checkoutId) => {
  const { data: checkout, error } = useSWR(
    [`/api/existingCheckout/`, checkoutId],
    fetcherWithCheckout
  );
  return {
    checkout,
    isLoading: (!error && !checkout) || checkout.msg === 'loading',
    isError: error,
  };
};

export default useCart;
