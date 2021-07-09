import { Flex, Text } from '@chakra-ui/react';

const CookieToast = ({ bg, color }) => {
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
      <Text p='1rem'>WE USE COOKIES TO ENHANCE YOUR SHOPPING EXPERIENCE</Text>
    </Flex>
  );
};

export default CookieToast;
