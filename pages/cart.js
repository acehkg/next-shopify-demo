import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import useCartContext from '../hooks/useCartContext';
//chakra ui
import { Box, Flex, Image, Text, Spinner, Button } from '@chakra-ui/react';
//components
import QuantityAdjust from '../components/interface/QuantityAdjust';
import BackButton from '../components/interface/BackButton';
import TrashButton from '../components/interface/TrashButton';
//
import { mutate } from 'swr';

const Loading = () => {
  return (
    <Flex pt={'10rem'} justify='center' align='center'>
      <Spinner size='xl' />
    </Flex>
  );
};

const ItemImage = ({ src, alt }) => {
  return (
    <Flex>
      <Image
        src={src}
        alt={alt}
        borderRadius={'50%'}
        boxSize='100px'
        objectFit='cover'
      />
    </Flex>
  );
};

const ItemInfo = ({ title, variant }) => {
  return (
    <Flex
      direction='column'
      textAlign='center'
      boxSize='100px'
      justify='center'
    >
      <Text>{title}</Text>
      <Text>{variant}</Text>
    </Flex>
  );
};

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

const Checkout = ({ total, currency, url }) => {
  const price = (total * 1).toFixed(2);
  return (
    <Box textAlign='center' mt='2rem'>
      <Text fontSize='1.25rem' pb={'2rem'}>
        TOTAL ${`${price}${currency}`}
      </Text>
      <Button as='a' href={url} size='lg'>
        CHECKOUT
      </Button>
    </Box>
  );
};

const Cart = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);

  if (cartData.isLoading === true) {
    return <Loading />;
  }

  return (
    <>
      <Box width='100px' marginLeft='auto' marginRight='auto'>
        <BackButton size='lg' color='current' mb='2rem' />
      </Box>
      <Flex direction='column' align='center'>
        {cartData.checkout.lineItems.map((item) => (
          <CartItem
            key={item.variant.id}
            id={item.id}
            title={item.title}
            qty={item.quantity}
            price={item.variant.price}
            currency={item.variant.priceV2.currencyCode}
            size={item.variant.title}
            src={item.variant.image.src}
            alt={item.title}
            variantId={item.variant.id}
            variant={item.variant.title}
          />
        ))}
        <Checkout
          total={cartData.checkout.totalPriceV2.amount}
          currency={cartData.checkout.totalPriceV2.currencyCode}
          url={cartData.checkout.webUrl}
        />
      </Flex>
    </>
  );
};

export default Cart;
