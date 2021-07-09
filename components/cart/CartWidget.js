import { useCookies } from 'react-cookie';
import { Box } from '@chakra-ui/react';
import { RiShoppingBagLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import QuantityDisplay from './QuantityDispaly';
import useCartContext from '../../hooks/useCartContext';

const CartWidget = () => {
  const { itemsInCart } = useCartContext();

  return (
    <Box aria-label='cart' mb='1.5rem'>
      <QuantityDisplay
        height='1.25rem'
        width='1.25rem'
        borderRadius='50%'
        fontSize={'1rem'}
        lineHeight='1.3'
        quantity={itemsInCart}
      />
      <RiShoppingBagLine size={32} />
    </Box>
  );
};

export default CartWidget;
