import { Box, Text, Button } from '@chakra-ui/react';

const Checkout = ({ total, currency, url, ...rest }) => {
  const price = (total * 1).toFixed(2);
  return (
    <Box textAlign='center' mb='2rem' {...rest}>
      <Text fontSize='1.25rem' pb={'2rem'}>
        TOTAL ${`${price}${currency}`}
      </Text>
      <Button as='a' href={url} size='lg'>
        CHECKOUT
      </Button>
    </Box>
  );
};

export default Checkout;
