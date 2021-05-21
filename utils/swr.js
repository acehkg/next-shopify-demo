export const fetcherWithCheckout = async (url, checkoutId) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: checkoutId,
    });
    const checkout = await res.json();
    return checkout;
  } catch (e) {
    console.log('Still waiting for checkout ID');
    console.log(e);
  }
};
