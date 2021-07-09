import { Flex, Text } from '@chakra-ui/react';

const CartToast = ({ bg, color }) => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      color={color}
      bg={bg}
      height='5rem'
      textAlign='center'
      fontSize='lg'
      rounded='md'
    >
      <Text>ITEM ADDED TO CART</Text>
    </Flex>
  );
};

export default CartToast;
