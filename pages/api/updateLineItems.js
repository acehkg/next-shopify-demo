import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // update line item
  const { variantId, quantity, checkoutId } = JSON.parse(req.body);

  const itemToUpdate = [
    {
      variantId,
      quantity,
    },
  ];
  await shopifyClient.checkout.updateLineItems(checkoutId, itemToUpdate);
  res.status(200).json();
}
