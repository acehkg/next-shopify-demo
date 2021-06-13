import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // fetch existing  checkout
  try {
    const checkout = await shopifyClient.checkout.fetch(req.body);
    res.status(200).json(checkout);
  } catch (err) {
    res.status(202).json({ msg: 'Waiting for Checkout Id' });
  }
}
