import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // create new checkout

  try {
    const checkout = await shopifyClient.checkout.create();
    res.status(200).json(checkout);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Cannot Create A New Checkout' });
  }
}
