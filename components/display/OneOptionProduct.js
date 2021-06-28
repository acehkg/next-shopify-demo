import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import { Flex, Text, Heading, Box } from '@chakra-ui/react';
//components
import QuantityAdjust from '../interface/QuantityAdjust';
import BuyButton from '../interface/BuyButton';
import LabelRadio from '../interface/Radio/LabelRadio';
import Image from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  img {
    border-radius: var(--chakra-radii-md);
  }
`;

const OneOptionProduct = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart, updateItemsCookie } = useCartContext();
  //for a product with to options render selectors and filter selections for target variantId
  //seperate the two options arrays
  const optionOne = product.options[0];

  //filter the array of variants for the created filter and return selected varaiant
  const [filter, setFilter] = useState(product.options[0].values[0].value);
  const [selected, setSelected] = useState(product.variants[0]);
  useEffect(() => {
    const filtered = product.variants.filter((variant) => {
      return variant.title.includes(filter);
    });
    setSelected(() => filtered[0]);
  }, [filter]);

  const [quantity, setQuantity] = useState(1);
  const incrementQty = () => {
    setQuantity(() => quantity + 1);
  };

  const decrementQty = () => {
    quantity === 1 ? setQuantity(1) : setQuantity(() => quantity - 1);
  };

  //calculate totaprice when selected changes
  const [totalPrice, setTotalPrice] = useState(0.0);
  useEffect(() => {
    const price = selected.price;
    setTotalPrice(price * quantity);
  }, [quantity, selected]);

  const router = useRouter();

  const handleClick = async () => {
    try {
      await addItemToCart(selected.id, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
      router.push('/cart');
      updateItemsCookie(checkoutId);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };

  const [stock, setStock] = useState(true);

  useEffect(() => {
    selected.available ? setStock(true) : setStock(false);
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
                src={selected.image.src}
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

          <LabelRadio
            options={optionOne.values}
            name={optionOne.name}
            onChange={setFilter}
          />
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
            currencyCode={selected.priceV2.currencyCode}
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

export default OneOptionProduct;
