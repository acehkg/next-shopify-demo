import { useState } from 'react';
import Link from 'next/link';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//styling
import styled from 'styled-components';
import { Select, Button, Icon } from 'semantic-ui-react';

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

const OptionsSelect = ({ options, onChange }) => {
  return (
    <SelectWrapper>
      <Select
        placeholder='Select Quantity'
        options={options}
        onChange={onChange}
      />
    </SelectWrapper>
  );
};
const SelectWrapper = styled.div`
  padding: 0 1rem;
`;
const BuyButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <Button icon onClick={onClick}>
        <Icon name='add to cart' />
      </Button>
    </ButtonWrapper>
  );
};
const ButtonWrapper = styled.div`
  padding-right: 0.75rem;
`;
const BuyNow = ({ options, onChange, onClick }) => {
  return (
    <BuyWrapper>
      <OptionsSelect options={options} onChange={onChange} />
      <BuyButton onClick={onClick} />
    </BuyWrapper>
  );
};

const BuyWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 1rem;
`;
const ProductCard = ({ product }) => {
  //retrieve checkout ID and funtions from cart context for adding to cart
  const { addItemToCart, checkoutId } = useCartContext();
  //set value of selected dropdown items in state
  const [selected, setSelected] = useState();
  //function to create the options array for the semantic UI react select component
  const selectOptions = product.variants.map((variant) => {
    return {
      key: variant.id,
      value: variant.id,
      text:
        variant.title +
        ' ' +
        '$' +
        variant.price +
        variant.priceV2.currencyCode,
    };
  });

  //evetn handler for add to cart button
  const handleClick = async () => {
    try {
      await addItemToCart(selected, 1, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };
  //evetn handler for change dropdown value
  const selectChange = (e, data) => {
    e.preventDefault();
    setSelected(data.value);
  };

  return (
    <Wrapper>
      <Link href={`/products/${product.handle}`}>
        <a>
          <CardImage src={product.images[0].src} alt={product.title} />
          <CardContent
            title={product.title}
            description={product.description}
          />
        </a>
      </Link>
      <BuyNow
        options={selectOptions}
        onChange={selectChange}
        onClick={handleClick}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 375px) {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;
export default ProductCard;
