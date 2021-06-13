import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // update line item
  //make sure POST request from client
  if (req.method !== 'POST') {
    return res.status.json({ msg: 'Method Not Allowed' });
  }
  //creat item to update
  const { id, variantId, quantity, checkoutId } = JSON.parse(req.body);

  const itemToUpdate = [
    {
      id,
      quantity,
      variantId,
    },
  ];

  //update cart
  try {
    await shopifyClient.checkout.updateLineItems(checkoutId, itemToUpdate);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Problem Updating Item In Cart' });
  }
}
