import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // add line item
  //make sure POST request from client
  if (req.method !== 'POST') {
    return res.status.json({ msg: 'Method Not Allowed' });
  }
  //parse request body and create item to add
  const { variantId, quantity, checkoutId } = JSON.parse(req.body);
  const itemToAdd = [
    {
      variantId,
      quantity,
    },
  ];

  //add item to cart
  try {
    await shopifyClient.checkout.addLineItems(checkoutId, itemToAdd);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Problem Adding Item To Cart' });
  }
}
