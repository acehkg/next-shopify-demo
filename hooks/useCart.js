import useSWR from 'swr';
import { fetcherWithCheckout } from '../utils/swr';

const useCart = (checkoutId) => {
  const { data: checkout, error } = useSWR(
    [`/api/existingCheckout/`, checkoutId],
    fetcherWithCheckout
  );
  console.log('swr triggered');
  return {
    checkout,
    isLoading: !error && !checkout,
    isError: error,
  };
};

export default useCart;
