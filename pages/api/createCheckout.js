import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // create new checkout
  const checkout = await shopifyClient.checkout.create();
  res.status(200).json(checkout);
}
