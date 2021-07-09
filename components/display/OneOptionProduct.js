import { useState, useEffect } from 'react';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import {
  Flex,
  Text,
  Heading,
  Box,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
//components
import QuantityAdjust from '../interface/QuantityAdjust';
import BuyButton from '../interface/BuyButton';
import LabelRadio from '../interface/Radio/LabelRadio';
import Image from 'next/image';
import CartToast from '../modals/CartToast';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  img {
    border-radius: var(--chakra-radii-md);
  }
`;

const OneOptionProduct = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
  const bg = useColorModeValue('gray.200', 'gray.700');
  const color = useColorModeValue('black', 'white');
  //for a product with to options render selectors and filter selections for target variantId
  //seperate the two options arrays
  const optionOne = product.options[0];

  //filter the array of variants for the created filter and return selected varaiant
  const [filter, setFilter] = useState(product.options[0].values[0]);
  const [selected, setSelected] = useState(product.variants.edges[0]);
  useEffect(() => {
    const filtered = product.variants.edges.filter((variant) => {
      return variant.node.title.includes(filter);
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
    const price = selected.node.priceV2.amount;
    const pFloat = parseFloat(price);
    setTotalPrice((pFloat * quantity).toFixed(2));
  }, [quantity, selected]);

  //const router = useRouter();
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
            {selected.node.image === null ? (
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

export default OneOptionProduct;
