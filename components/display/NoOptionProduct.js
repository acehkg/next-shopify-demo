import { useState, useEffect } from 'react';
import styled from 'styled-components';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
import { Select, Icon } from 'semantic-ui-react';
import { createNumberOptions } from '../../utils/utils';

const QtyBuy = ({ quantity, handleQty, number, handleClick }) => {
  const options = createNumberOptions(number);

  return (
    <BuyWrapper>
      <InputWrapper>
        <Select
          aria-label='Quantity'
          options={options}
          placeholder={`${quantity}`}
          onChange={handleQty}
          fluid={true}
        />
      </InputWrapper>
      <ButtonWrapper>
        <BuyButton onClick={handleClick}>
          <Icon name='add to cart' />
        </BuyButton>
      </ButtonWrapper>
    </BuyWrapper>
  );
};

const BuyWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div``;

const ButtonWrapper = styled.div``;

const BuyButton = styled.button`
  padding-top: 0.25rem;
  width: 3rem;
  height: 2.8rem;
  text-align: center;
  background: lightgrey;
  border: none;
  border-radius: 0.25rem;
`;

const SelectedImage = ({ selected }) => {
  return <Image src={selected.images[0].src} alt={selected.title} />;
};
const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ProductDescription = ({ product }) => {
  return (
    <DescriptionWrapper>
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = styled.div`
  padding: 2rem 0;
  width: 80%;
  margin: 0 auto;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem 0;
`;
const Description = styled.p`
  line-height: 1.45;
  text-align: center;
`;
const NoOptionProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();

  const handleClick = async () => {
    try {
      await addItemToCart(product.variants[0].id, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };

  //set respective states from the individual selects

  const handleQty = (e, data) => {
    e.preventDefault();
    setQuantity(() => data.value);
  };

  return (
    <PageWrapper>
      <SelectedImage selected={product} />
      <DescriptionBuyWrapper>
        <ProductDescription product={product} />
        <FilterBuyWrapper>
          <QtyBuy
            quantity={quantity}
            handleQty={handleQty}
            number={10}
            handleClick={handleClick}
          />
        </FilterBuyWrapper>
      </DescriptionBuyWrapper>
    </PageWrapper>
  );
};

const FilterBuyWrapper = styled.div`
  width: 80%;
  padding-top: 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PageWrapper = styled.div`
  @media (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
    display: flex;
  }
`;

const DescriptionBuyWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export default NoOptionProduct;
