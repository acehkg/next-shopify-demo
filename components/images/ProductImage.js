import styled from 'styled-components';
import { Box } from '@chakra-ui/react';

const ProductImage = ({ product, selected, ...rest }) => {
  return (
    <Box {...rest}>
      <CustomImage src={selected.image.src} alt={product.title} />
    </Box>
  );
};
const CustomImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.4rem;
`;
export default ProductImage;
