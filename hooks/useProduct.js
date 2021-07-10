import { useState, useEffect } from 'react';

const useProduct = (product) => {
  //handle adjusting quantity
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => {
    setQuantity(() => quantity + 1);
  };

  const decrementQty = () => {
    quantity === 1 ? setQuantity(1) : setQuantity(() => quantity - 1);
  };

  //handle initial value of selected variant
  const [selected, setSelected] = useState(product.variants.edges[0]);

  //handle checking if item is in stock
  const [stock, setStock] = useState(true);

  useEffect(() => {
    selected.node.availableForSale ? setStock(true) : setStock(false);
  }, [selected]);

  //handle setting price
  const [totalPrice, setTotalPrice] = useState(0.0);
  useEffect(() => {
    const price = selected.node.priceV2.amount;
    const pFloat = parseFloat(price);
    setTotalPrice((pFloat * quantity).toFixed(2));
  }, [quantity, selected]);

  return {
    quantity,
    incrementQty,
    decrementQty,
    stock,
    selected,
    setSelected,
    totalPrice,
  };
};

export default useProduct;
