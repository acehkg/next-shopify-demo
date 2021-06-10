import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import { Flex, Text, Heading } from '@chakra-ui/react';
//components
import ProductImage from '../images/ProductImage';
import QuantityAdjust from '../interface/QuantityAdjust';
import BuyButton from '../interface/BuyButton';

const NoOptionProduct = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
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
    const price = product.variants[0].price;
    setTotalPrice(price * quantity);
  }, [quantity]);

  const router = useRouter();

  const handleClick = async () => {
    try {
      await addItemToCart(product.variants[0].id, quantity, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
      router.push('/cart');
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };

  return (
    <>
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
        <ProductImage
          product={product}
          selected={product.variants[0]}
          mt={['2rem', '2rem', '2rem', '0']}
          mb='2rem'
          width={['90%', '90%', '80%', '80%']}
          mr={['0', '0', '0', '2%']}
        />

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
            totalPrice={totalPrice}
            currencyCode={product.variants[0].priceV2.currencyCode}
            handleClick={handleClick}
            quantity={quantity}
            title={product.title}
            mt='2rem'
            mb='2rem'
          />
        </Flex>
      </Flex>
    </>
  );
};

export default NoOptionProduct;
