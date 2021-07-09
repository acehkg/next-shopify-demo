import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import { Flex, Text, Heading, Box, useToast } from '@chakra-ui/react';
//components
import QuantityAdjust from '../interface/QuantityAdjust';
import BuyButton from '../interface/BuyButton';
import Image from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  img {
    border-radius: var(--chakra-radii-md);
  }
`;

const NoOptionProduct = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart, updateItemsCookie } = useCartContext();
  //handle quantity
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
    const price = product.variants.edges[0].node.priceV2.amount;
    const pFloat = parseFloat(price);
    setTotalPrice((pFloat * quantity).toFixed(2));
  }, [quantity]);

  // const router = useRouter();

  const toast = useToast();

  const handleClick = async () => {
    try {
      await addItemToCart(
        product.variants.edges[0].node.id,
        quantity,
        checkoutId
      );
      mutate([`/api/storefrontQuery/`, checkoutId]);
      toast({
        isClosable: true,
        render: () => (
          <Flex
            justifyContent='center'
            alignItems='center'
            color='white'
            bg='gray.700'
            height='5rem'
            textAlign='center'
            fontSize='lg'
            rounded='md'
          >
            ITEM ADDED TO CART
          </Flex>
        ),
      });
      //router.push('/cart');
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };
  const [stock, setStock] = useState(true);

  useEffect(() => {
    product.variants.edges[0].node.availableForSale
      ? setStock(true)
      : setStock(false);
  }, []);

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
            {product.variants.edges[0].node.image === null ? (
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
                src={product.variants.edges[0].node.image.originalSrc}
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
            currencyCode={product.variants.edges[0].node.priceV2.currencyCode}
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

export default NoOptionProduct;
