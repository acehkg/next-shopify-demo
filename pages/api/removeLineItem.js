import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // remove line item
  //make sure POST request from client
  if (req.method !== 'POST') {
    return res.status.json({ msg: 'Method Not Allowed' });
  }
  //create item to be removed
  const { variantId, checkoutId } = JSON.parse(req.body);
  const itemToRemove = [variantId];

  try {
    await shopifyClient.checkout.removeLineItems(checkoutId, itemToRemove);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Problem Removing Item From Cart' });
  }
}
