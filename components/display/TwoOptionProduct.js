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
const SelectorTwo = ({ values, title, handleChange }) => {
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

const SelectedImage = ({ selected, original }) => {
  if (selected === undefined) {
    return <Image src={original.image.src} alt={original.title} />;
  }
  return <Image src={selected.image.src} alt={selected.title} />;
};
const Image = styled.img`
  width: 100%;
  height: auto;
`;
const TwoOptionProduct = ({ product }) => {
  //for a product with to options render selectors and filter selections for target variantId
  const [selected, setSelected] = useState(product.variants);
  const [selectOne, setSelectOne] = useState();
  const [selectTwo, setSelectTwo] = useState();
  const [filter, setFilter] = useState('');
  const [quantity, setQuantity] = useState(1);
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
  //seperate the two options arrays
  const optionOne = product.options[0];
  const optionTwo = product.options[1];

  //create filter from the two selections
  useEffect(() => {
    setFilter(() => selectOne + ' ' + '/' + ' ' + selectTwo);
  }, [selectOne, selectTwo]);

  //filter the array of variants for the created filter and return selected varaiant
  useEffect(() => {
    const filtered = product.variants.filter((variant) => {
      return variant.title.includes(filter);
    });
    setSelected(() => filtered);
  }, [filter]);

  const handleClick = async () => {
    try {
      await addItemToCart(selected[0].id, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };

  //set respective states from the individual selects
  const handleChangeOne = (e, data) => {
    e.preventDefault();
    setSelectOne(() => data.value);
  };

  const handleChangeTwo = (e, data) => {
    e.preventDefault();
    setSelectTwo(() => data.value);
  };

  const handleQty = (e, data) => {
    e.preventDefault();
    setQuantity(() => data.value);
  };

  return (
    <>
      <SelectedImage selected={selected[0]} original={product.variants[0]} />
      <SelectorWrapper>
        <SelectorOne
          values={optionOne.values}
          title={optionOne.name}
          handleChange={handleChangeOne}
        />
        <SelectorTwo
          values={optionTwo.values}
          title={optionTwo.name}
          handleChange={handleChangeTwo}
        />
      </SelectorWrapper>
      <FilterBuyWrapper>
        <Filter>{filter.includes('undefined') ? '' : filter}</Filter>
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
const SelectorWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
`;

const FilterBuyWrapper = styled.div`
  width: 80%;
  padding-top: 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Filter = styled.p`
  text-align: center;
  width: 100%;
`;
export default TwoOptionProduct;
