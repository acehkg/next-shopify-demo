import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // fetch existing  checkout
  const checkout = await shopifyClient.checkout.fetch(req.body);
  res.status(200).json(checkout);
}
