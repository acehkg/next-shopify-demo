import styled from 'styled-components';

const ProductImage = ({ product, selected }) => {
  return (
    <div>
      <CustomImage src={selected.image.src} alt={product.title} />
    </div>
  );
};
const CustomImage = styled.img`
  width: 100%;
  height: auto;
`;
export default ProductImage;
