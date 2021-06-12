import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 150px;
  img {
    border-radius: var(--chakra-radii-md);
  }
`;

const ItemImage = ({ src, alt, ...rest }) => {
  return (
    <Flex {...rest}>
      <Wrapper>
        <Image
          src={src}
          alt={alt}
          height={577}
          width={768}
          layout='responsive'
          quality={50}
        />
      </Wrapper>
    </Flex>
  );
};

export default ItemImage;
