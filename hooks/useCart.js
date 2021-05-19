import useSWR from 'swr';

const fetcherWithCheckout = async (url, checkoutId) => {
  const res = await fetch(url, {
    method: 'POST',
    body: checkoutId,
  });
  const checkout = await res.json();
  return checkout;
};

const useCart = (checkoutId) => {
  const { data, error } = useSWR(
    [`/api/existingCheckout/`, checkoutId],
    fetcherWithCheckout
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCart;
