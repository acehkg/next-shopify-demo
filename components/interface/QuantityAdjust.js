//chakra ui
import { Stack, Text, IconButton } from '@chakra-ui/react';
//icons
import { FiPlusSquare, FiMinusSquare, FiTrash2 } from 'react-icons/fi';

const QuantityAdjust = ({
  quantity,
  incrementQty,
  decrementQty,
  withTrash,
  paddingTop,
  handleTrash,
}) => {
  if (withTrash === true) {
    return (
      <Stack direction='row' spacing={8} pt={paddingTop}>
        <IconButton
          aria-label='Increase Quantity'
          icon={<FiPlusSquare />}
          size='sm'
          onClick={incrementQty}
        />
        <IconButton
          aria-label='Decrease Quantity'
          icon={<FiMinusSquare />}
          size='sm'
          onClick={decrementQty}
        />
        <IconButton
          aria-label='Delete Item'
          icon={<FiTrash2 color={'red'} />}
          size='sm'
          onClick={handleTrash}
        />
      </Stack>
    );
  }
  return (
    <Stack direction='row' spacing={8} pt={paddingTop}>
      <IconButton
        aria-label='Increase Quantity'
        icon={<FiPlusSquare />}
        size='sm'
        onClick={incrementQty}
      />
      <Text>{quantity}</Text>
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
