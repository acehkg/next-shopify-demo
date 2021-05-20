import useSWR from 'swr';

const fetcherWithCheckout = async (url, checkoutId) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: checkoutId,
    });
    const checkout = await res.json();
    return checkout;
  } catch (e) {
    console.log('Problem fetching checkout...');
    console.log(e);
  }
};

const useCart = (checkoutId) => {
  const { data: checkout, error } = useSWR(
    [`/api/existingCheckout/`, checkoutId],
    fetcherWithCheckout
  );
  console.log(checkout);
  return {
    checkout,
    isLoading: !error && !checkout,
    isError: error,
  };
};

export default useCart;
