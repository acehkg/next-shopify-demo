import useCart from '../../hooks/useCart';
import useCartContext from '../../hooks/useCartContext';
import { Flex, Text, Spinner, Box } from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';

const Waiting = () => {
  return (
    <Box pl={'1rem'} pt={'0.5rem'}>
      <Spinner size='md' />
    </Box>
  );
};

const CartWidget = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);

  if (cartData.isLoading === true) {
    return <Waiting />;
  }

  const price = cartData.checkout.totalPriceV2.amount;
  const total = (price * 1).toFixed(2);
  return (
    <Flex
      direction='column'
      align='center'
      pt={[2, 2, 0, 0]}
      pl={[0, 0, 4, 0]}
      aria-label='cart'
    >
      <RiShoppingCart2Line size={24} />
      <Text>${total}</Text>
    </Flex>
  );
};

export default CartWidget;
