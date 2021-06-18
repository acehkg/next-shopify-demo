import useCart from '../../hooks/useCart';
import useCartContext from '../../hooks/useCartContext';
import { Spinner, Box } from '@chakra-ui/react';
import { RiShoppingBagLine } from 'react-icons/ri';
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
    <Box aria-label='cart' mb='1.5rem'>
      <QuantityDisplay
        height='1.25rem'
        width='1.25rem'
        borderRadius='50%'
        fontSize={'1rem'}
        lineHeight='1.3'
        quantity={total}
      />
      <RiShoppingBagLine size={32} />
    </Box>
  );
};

export default CartWidget;
