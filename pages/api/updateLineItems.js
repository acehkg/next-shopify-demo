import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // update line item
  const { id, variantId, quantity, checkoutId } = JSON.parse(req.body);

  const itemToUpdate = [
    {
      id,
      quantity,
      variantId,
    },
  ];
  await shopifyClient.checkout.updateLineItems(checkoutId, itemToUpdate);
  res.status(200).json();
}
