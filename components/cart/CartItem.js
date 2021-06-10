import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import useCartContext from '../../hooks/useCartContext';
import { Flex, Text } from '@chakra-ui/react';
import QuantityAdjust from '../interface/QuantityAdjust';
import TrashButton from '../interface/TrashButton';
import ItemInfo from './ItemInfo';
import ItemImage from './ItemImage';

const CartItem = ({
  src,
  alt,
  qty,
  title,
  price,
  id,
  variantId,
  variant,
  currency,
}) => {
  const { checkoutId, removeItemFromCart, updateItemInCart } = useCartContext();
  const [quantity, setQuantity] = useState(qty);
  const incrementQty = () => {
    setQuantity(() => quantity + 1);
  };

  const decrementQty = () => {
    quantity === 1 ? setQuantity(1) : setQuantity(() => quantity - 1);
  };
  //calculate price when qty changes
  const [totalPrice, setTotalPrice] = useState(price);
  useEffect(() => {
    setTotalPrice((price * quantity).toFixed(2));
  }, [quantity]);

  useEffect(async () => {
    try {
      await updateItemInCart(id, variantId, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error updating cart...');
      console.log(e);
    }
  }, [quantity]);

  const handleTrash = async () => {
    try {
      await removeItemFromCart(id, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error Removing Item from Cart...');
      console.log(e);
    }
  };

  return (
    <Flex
      direction='column'
      align='center'
      borderColor='gray.700'
      borderWidth={1}
      borderStyle='solid'
      rounded='md'
      py='1rem'
      mb='2rem'
    >
      <Flex align='center' width='18rem' justify='space-around'>
        <ItemImage src={src} alt={alt} quantity={quantity} />

        <ItemInfo title={title} price={totalPrice} variant={variant} />
      </Flex>
      <Flex align='center' width='18rem' justify='space-around' pt='1rem'>
        <QuantityAdjust
          incrementQty={incrementQty}
          decrementQty={decrementQty}
          quantity={quantity}
        />
        <Text>
          ${totalPrice}
          {currency}
        </Text>
        <TrashButton handleTrash={handleTrash} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
