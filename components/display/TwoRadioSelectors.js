import { useState, useEffect } from 'react';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import {
  Flex,
  Stack,
  Text,
  Heading,
  Box,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
//components
import QuantityAdjust from '../interface/QuantityAdjust';
import BuyButton from '../interface/BuyButton';
import ColorRadio from '../interface/Radio/ColorRadio';
import LabelRadio from '../interface/Radio/LabelRadio';
import Image from 'next/image';
import styled from 'styled-components';
import CartToast from '../modals/CartToast';
import useProduct from '../../hooks/useProduct';

const ImageWrapper = styled.div`
  img {
    border-radius: var(--chakra-radii-md);
  }
`;

const TwoRadioSelectors = ({ product }) => {
  //styling changes for light/dark mode
  const bg = useColorModeValue('gray.200', 'gray.700');
  const color = useColorModeValue('black', 'white');

  //access cart context
  const { checkoutId, addItemToCart } = useCartContext();

  //placed common variables in custom hook for efficiency
  const {
    quantity,
    incrementQty,
    decrementQty,
    stock,
    selected,
    setSelected,
    totalPrice,
  } = useProduct(product);

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
  useEffect(() => {
    const filtered = product.variants.edges.filter((variant) => {
      return variant.node.title.includes(filter);
    });
    setSelected(() => filtered[0]);
  }, [filter]);

  const toast = useToast();

  const handleClick = async () => {
    try {
      await addItemToCart(selected.node.id, quantity, checkoutId);
      mutate([`/api/storefrontQuery/`, checkoutId]);
      toast({
        duration: 5000,
        render: () => <CartToast bg={bg} color={color} />,
      });
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
