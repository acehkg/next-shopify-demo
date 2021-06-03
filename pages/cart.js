import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import useCartContext from '../hooks/useCartContext';
//chakra ui
import {
  Box,
  Flex,
  Badge,
  Image,
  Stack,
  Text,
  Spinner,
  Button,
} from '@chakra-ui/react';
//components
import QuantityAdjust from '../components/interface/QuantityAdjust';
import BackButton from '../components/interface/BackButton';
import { mutate } from 'swr';

const Loading = () => {
  return (
    <Flex pt={'10rem'} justify='center' align='center'>
      <Spinner size='xl' />
    </Flex>
  );
};

const ItemImage = ({ src, alt, quantity }) => {
  return (
    <Flex pt={'2rem'}>
      <Image
        src={src}
        alt={alt}
        borderRadius={'50%'}
        boxSize='100px'
        objectFit='cover'
      />
      <Box>
        <Badge
          colorScheme='gray'
          fontSize={'1rem'}
          px={'1rem'}
          py={'0.5rem'}
          borderRadius={'50%'}
        >
          {quantity}
        </Badge>
      </Box>
    </Flex>
  );
};

const ItemInfo = ({ title, price }) => {
  return (
    <Stack direction='row' spacing={4}>
      <Text>{title}</Text>
      <Text>${price}</Text>
    </Stack>
  );
};

const CartItem = ({ src, alt, qty, title, price, id, variantId }) => {
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
    setTotalPrice(price * quantity);
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
    <Flex direction='column' align='center'>
      <ItemImage src={src} alt={alt} quantity={quantity} />
      <ItemInfo title={title} price={totalPrice} />
      <QuantityAdjust
        withTrash={true}
        paddingTop='1rem'
        incrementQty={incrementQty}
        decrementQty={decrementQty}
        handleTrash={handleTrash}
      />
    </Flex>
  );
};

const Checkout = ({ total, currency, url }) => {
  const price = (total * 1).toFixed(2);
  return (
    <Box textAlign='center' pt={'2rem'}>
      <Text pb={'1rem'}>${`${price}${currency}`}</Text>
      <Button as='a' href={url}>
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
        <BackButton size='lg' color='current' />
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
