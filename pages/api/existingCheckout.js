import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // fetch existing  checkout
  try {
    const checkout = await shopifyClient.checkout.fetch(req.body);
    res.status(200).json(checkout);
  } catch (err) {
    return res.status(200).json({ msg: 'Waiting For Checkout ID' });
  }
}
