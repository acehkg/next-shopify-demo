//chakra ui
import { Stack, Text, IconButton } from '@chakra-ui/react';
//icons
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
//components
import QuantityDisplay from '../cart/QuantityDispaly';

const QuantityAdjust = ({ quantity, incrementQty, decrementQty, ...rest }) => {
  return (
    <Stack direction='row' {...rest}>
      <IconButton
        aria-label='Increase Quantity'
        icon={<FiPlusSquare />}
        size='sm'
        onClick={incrementQty}
      />
      <QuantityDisplay
        height='2rem'
        width='2rem'
        borderRadius='50%'
        fontSize={'1rem'}
        lineHeight='2'
        quantity={quantity}
      />
      <IconButton
        aria-label='Decrease Quantity'
        icon={<FiMinusSquare />}
        size='sm'
        onClick={decrementQty}
      />
    </Stack>
  );
};

export default QuantityAdjust;
