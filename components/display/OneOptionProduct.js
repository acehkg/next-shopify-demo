import { useState, useEffect } from 'react';
import styled from 'styled-components';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import { Flex, Text, Heading, Radio, RadioGroup } from '@chakra-ui/react';

const Selector = ({ values, selectOne, setSelectOne }) => {
  return (
    <RadioGroup value={selectOne} onChange={setSelectOne}>
      {values.map((value) => {
        return <Radio value={value.value}>{value.value}</Radio>;
      })}
    </RadioGroup>
  );
};

const ImageGroup = ({ product, selected }) => {
  return <Flex></Flex>;
};
const OneOptionProduct = ({ product }) => {
  //for a product with to options render selectors and filter selections for target variantId
  const [selected, setSelected] = useState(product.variants[0]);
  const [selectOne, setSelectOne] = useState();
  const [filter, setFilter] = useState('');
  const [quantity, setQuantity] = useState(1);
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
  //seperate the two options arrays
  const optionOne = product.options[0];

  //create filter from the two selections
  useEffect(() => {
    setFilter(() => selectOne);
  }, [selectOne]);

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

  const handleQty = (e) => {
    setQuantity(() => e.value);
  };
  console.log(selected);
  return (
    <Flex direction='column' align='center'>
      <ImageGroup product={product} selected={selected} />
      <Selector
        values={optionOne.values}
        selectOne={selectOne}
        setSelectOne={setSelectOne}
      />
    </Flex>
  );
};

export default OneOptionProduct;
