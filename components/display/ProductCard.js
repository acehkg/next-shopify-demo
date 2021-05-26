import { useState, useEffect } from 'react';
import Link from 'next/link';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//styling
import styled from 'styled-components';
import { Select, Button, Icon } from 'semantic-ui-react';

const CardImage = ({ product, variant }) => {
  //filter for and display image of selected variant
  const variantSelected = product.variants.filter((v) => v.id === variant);

  return <Image src={variantSelected[0].image.src} />;
};

const Image = styled.img`
  width: 100%;
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
        placeholder='Select Options'
        options={options}
        onChange={onChange}
        aria-label='select options'
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
      <Button icon onClick={onClick} aria-label='Buy Now'>
        <Icon name='add to cart' />
      </Button>
    </ButtonWrapper>
  );
};
const ButtonWrapper = styled.div`
  padding-right: 0.75rem;
`;

const BuyNow = ({ options, onChange, onClick, variants, oneVariant }) => {
  //if no variants render a buy button only else render the select
  if (variants.length === 1) {
    useEffect(() => {
      oneVariant(variants[0].id);
    }, []);

    return (
      <OneWrapper>
        <OnePrice>${variants[0].price}</OnePrice>
        <BuyButton onClick={onClick} />
      </OneWrapper>
    );
  }
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

const OneWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
`;
const OnePrice = styled.p``;
const ProductCard = ({ product }) => {
  //retrieve checkout ID and funtions from cart context for adding to cart
  const { addItemToCart, checkoutId } = useCartContext();

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

  //set state of selected variant
  const variants = product.variants;
  const [selected, setSelected] = useState(variants[0].id);

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

  //only one variant
  const oneVariant = (id) => {
    setSelected(id);
  };
  return (
    <Wrapper>
      <CardImage product={product} variant={selected} />
      <Link href={`/products/${product.handle}`}>
        <a>
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
        variants={variants}
        oneVariant={oneVariant}
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
  justify-content: space-between;

  @media (min-width: 375px) {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  @media (min-width: 1024px) {
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;
export default ProductCard;
