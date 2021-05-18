import { shopifyClient } from '../../utils/client';

export default async function handler(req, res) {
  // add line item
  const { variantId, quantity, checkoutId } = JSON.parse(req.body);
  const itemToAdd = [
    {
      variantId,
      quantity,
    },
  ];
  const addItem = await shopifyClient.checkout.addLineItems(
    checkoutId,
    itemToAdd
  );
  res.status(200).json(addItem);
}
