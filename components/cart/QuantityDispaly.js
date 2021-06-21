import { Box, useColorModeValue } from '@chakra-ui/react';
const QuantityDisplay = ({ quantity, ...rest }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  return (
    <Box bg={bg} textAlign='center' aria-label='Quantity' {...rest}>
      {quantity}
    </Box>
  );
};

export default QuantityDisplay;
