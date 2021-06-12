import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // remove line item
  const { variantId, checkoutId } = JSON.parse(req.body);
  const itemToRemove = [variantId];
  await shopifyClient.checkout.removeLineItems(checkoutId, itemToRemove);
  res.status(200).json();
}
