import useSWR from 'swr';

const fetcherWithCheckout = async (url, checkoutId) => {
  await fetch('/api/existingCheckout', {
    method: 'POST',
    body: checkoutId,
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
    });
};

const useCart = (checkoutId) => {
  const { data, error } = useSWR(
    [`/api/existingCheckout/`, checkoutId],
    fetcherWithCheckout
  );
  console.log(JSON.stringify(data));
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCart;
