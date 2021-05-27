import { useState, useEffect } from 'react';
import styled from 'styled-components';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
import { Select, Icon } from 'semantic-ui-react';
import { createNumberOptions } from '../../utils/utils';

const SelectorOne = ({ values, title, handleChange }) => {
  //construct options object for the select
  const options = values.map((value) => {
    return {
      key: value.value,
      value: value.value,
      text: value.value,
    };
  });
  return (
    <Select
      aria-label={title}
      options={options}
      placeholder={title}
      onChange={handleChange}
      fluid={true}
    />
  );
};

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
    <>
      <SelectedImage selected={product} />
      <FilterBuyWrapper>
        <QtyBuy
          quantity={quantity}
          handleQty={handleQty}
          number={10}
          handleClick={handleClick}
        />
      </FilterBuyWrapper>
    </>
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

export default NoOptionProduct;
