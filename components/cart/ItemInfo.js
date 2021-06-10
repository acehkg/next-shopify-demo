import { Flex, Text } from '@chakra-ui/react';

const ItemInfo = ({ title, variant, ...rest }) => {
  return (
    <Flex
      direction='column'
      textAlign='center'
      boxSize='100px'
      justify='center'
      {...rest}
    >
      <Text>{title}</Text>
      <Text>{variant}</Text>
    </Flex>
  );
};

export default ItemInfo;
