import useCart from '../../hooks/useCart';
import useCartContext from '../../hooks/useCartContext';
import { Flex, Spinner, Box } from '@chakra-ui/react';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import QuantityDisplay from './QuantityDispaly';

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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartData.isLoading === false) {
      setTotal(cartData.checkout.lineItems.length);
    }
  }, [cartData]);

  if (cartData.isLoading === true) {
    return <Waiting />;
  }

  return (
    <Flex
      direction='column'
      align='center'
      pt={[2, 2, 0, 0]}
      pl={[0, 0, 4, 0]}
      aria-label='cart'
    >
      <QuantityDisplay
        height='1rem'
        width='1rem'
        borderRadius='50%'
        fontSize={'.75rem'}
        lineHeight='1.25'
        ml='.75rem'
        quantity={total}
      />
      <RiShoppingCart2Line size={24} />
    </Flex>
  );
};

export default CartWidget;
