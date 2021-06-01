import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import {
  Flex,
  Stack,
  Text,
  Heading,
  IconButton,
  Button,
} from '@chakra-ui/react';
//icons
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
import { FaCartPlus } from 'react-icons/fa';

const ImageGroup = ({ product, selected }) => {
  return (
    <Flex>
      <img
        src={selected.image.src}
        alt={product.title}
        style={{ width: '100%', height: 'auto' }}
      />
    </Flex>
  );
};

const Quantity = ({ quantity, incrementQty, decrementQty }) => {
  return (
    <Stack direction='row' spacing={4} pt={'2rem'}>
      <IconButton
        aria-label='Increase Quantity'
        icon={<FiPlusSquare />}
        size='xs'
        onClick={incrementQty}
      />
      <Text>{quantity}</Text>
      <IconButton
        aria-label='Decrease Quantity'
        icon={<FiMinusSquare />}
        size='xs'
        onClick={decrementQty}
      />
    </Stack>
  );
};

const BuyGroup = ({ totalPrice, currencyCode, handleClick }) => {
  return (
    <Button
      rightIcon={<FaCartPlus />}
      mt={'2rem'}
      mb={'2rem'}
      minWidth={['50%', '50%', '100%', '80%']}
      onClick={handleClick}
    >
      ${totalPrice}
      {currencyCode}
    </Button>
  );
};
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
      >
        {product.title}
      </Heading>
      <Flex
        direction={['column', 'column', 'row', 'row']}
        align='center'
        width={'90%'}
        ml={'auto'}
        mr={'auto'}
      >
        <ImageGroup product={product} selected={product.variants[0]} />

        <Flex
          direction='column'
          align='center'
          width={['100%', '100%', '50%', '50%']}
        >
          <Text
            pt={'2rem'}
            pb={'2rem'}
            align={['center', 'center', 'left', 'left']}
          >
            {product.description}
          </Text>
          <Quantity
            quantity={quantity}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
          <BuyGroup
            totalPrice={totalPrice}
            currencyCode={product.variants[0].priceV2.currencyCode}
            handleClick={handleClick}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default NoOptionProduct;
