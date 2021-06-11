import { Flex, Image } from '@chakra-ui/react';

const ItemImage = ({ src, alt, ...rest }) => {
  return (
    <Flex {...rest}>
      <Image
        src={src}
        alt={alt}
        borderRadius={'50%'}
        boxSize='100px'
        objectFit='cover'
      />
    </Flex>
  );
};

export default ItemImage;
