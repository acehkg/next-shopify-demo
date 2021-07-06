import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import { Flex, Stack, Text, Heading, Box } from '@chakra-ui/react';
//components
import QuantityAdjust from '../interface/QuantityAdjust';
import BuyButton from '../interface/BuyButton';
import ColorRadio from '../interface/Radio/ColorRadio';
import LabelRadio from '../interface/Radio/LabelRadio';
import Image from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  img {
    border-radius: var(--chakra-radii-md);
  }
`;

const TwoRadioSelectors = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart, updateItemsCookie } = useCartContext();
  //for a product with to options render selectors and filter selections for target variantId

  const [quantity, setQuantity] = useState(1);

  //seperate the two options arrays
  const optionOne = product.options[0];
  const [selectOne, setSelectOne] = useState('');
  const optionTwo = product.options[1];
  const [selectTwo, setSelectTwo] = useState('');

  //create filter from the two selections
  const [filter, setFilter] = useState('');
  useEffect(() => {
    setFilter(() => selectOne + ' ' + '/' + ' ' + selectTwo);
  }, [selectOne, selectTwo]);

  //filter the array of variants for the created filter and return selected varaiant
  const [selected, setSelected] = useState(product.variants.edges[0]);
  useEffect(() => {
    const filtered = product.variants.edges.filter((variant) => {
      return variant.node.title.includes(filter);
    });
    setSelected(() => filtered[0]);
  }, [filter]);

  //calculate totaprice when selected changes
  const [totalPrice, setTotalPrice] = useState(0.0);
  useEffect(() => {
    const price = selected.node.priceV2.amount;
    const pFloat = parseFloat(price);
    setTotalPrice((pFloat * quantity).toFixed(2));
  }, [quantity, selected]);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await addItemToCart(selected.node.id, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
      router.push('/cart');
      updateItemsCookie(checkoutId);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };

  //set respective states from the individual selects
  const handleChangeOne = (value) => {
    setSelectOne(() => value);
  };

  const handleChangeTwo = (value) => {
    setSelectTwo(() => value);
  };

  const incrementQty = () => {
    setQuantity(() => quantity + 1);
  };

  const decrementQty = () => {
    quantity === 1 ? setQuantity(1) : setQuantity(() => quantity - 1);
  };
  const [stock, setStock] = useState(true);

  useEffect(() => {
    selected.node.availableForSale ? setStock(true) : setStock(false);
  }, [selected]);

  return (
    <Box>
      <Heading
        textAlign='center'
        width={'90%'}
        ml={'auto'}
        mr={'auto'}
        pt={'2rem'}
        pb='2rem'
      >
        {product.title}
      </Heading>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        align={['center', 'center', 'center', 'unset']}
        width={'90%'}
        ml={'auto'}
        mr={'auto'}
      >
        <Box
          mt={['2rem', '2rem', '2rem', '0']}
          mb='2rem'
          width={['90%', '90%', '80%', '80%']}
          mr={['0', '0', '0', '2%']}
        >
          <ImageWrapper>
            {selected.image === null ? (
              <Image
                src='/images/comingsoon.jpg'
                alt={product.title}
                height={512}
                width={768}
                layout='responsive'
                quality={100}
              />
            ) : (
              <Image
                src={selected.node.image.originalSrc}
                alt={product.title}
                height={577}
                width={768}
                layout='responsive'
                quality={100}
              />
            )}
          </ImageWrapper>
        </Box>
        <Flex
          direction='column'
          align='center'
          width={['100%', '100%', '80%', '50%']}
        >
          <Text
            pt={['2rem', '2rem', '2rem', '0']}
            pb={'2rem'}
            align={['center', 'center', 'left', 'left']}
          >
            {product.description}
          </Text>
          <Stack
            direction='column'
            spacing={2}
            width={['19rem', '19rem', '20rem', '20rem']}
            align='center'
          >
            <ColorRadio
              options={optionOne.values}
              name={optionOne.name}
              onChange={handleChangeOne}
            />

            <LabelRadio
              options={optionTwo.values}
              name={optionTwo.name}
              onChange={handleChangeTwo}
            />
          </Stack>
          <Text pt='2rem'>{selected.title}</Text>
          <QuantityAdjust
            pt='2rem'
            spacing={8}
            quantity={quantity}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
          <BuyButton
            stock={stock}
            totalPrice={totalPrice}
            currencyCode={selected.node.priceV2.currencyCode}
            handleClick={handleClick}
            quantity={quantity}
            title={product.title}
            mt='2rem'
            mb='2rem'
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default TwoRadioSelectors;
