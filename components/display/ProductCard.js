//cart context
import useCartContext from '../../hooks/useCartContext';
import styled from 'styled-components';
import Link from 'next/link';
import { mutate } from 'swr';

const CardImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} />;
};

const Image = styled.img`
  width: 18rem;
  height: auto;
`;
const CardContent = ({ title, description }) => {
  return (
    <ContentWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  text-align: center;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  padding: 1rem;
`;

const Description = styled.p`
  padding: 1rem;
`;

const ProductCard = ({ product }) => {
  const { addItemToCart, checkoutId } = useCartContext();
  const handleClick = async () => {
    await addItemToCart(product.variants[0].id, 1, checkoutId);
    mutate([`/api/existingCheckout/`, checkoutId]);
  };

  return (
    <Wrapper>
      <Link href={`/products/${product.handle}`}>
        <>
          <CardImage src={product.images[0].src} alt={product.title} />
          <CardContent
            title={product.title}
            description={product.description}
          />
        </>
      </Link>
      <button onClick={handleClick}>BUY NOW</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  width: 19rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
export default ProductCard;
