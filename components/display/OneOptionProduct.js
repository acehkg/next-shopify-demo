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
  Radio,
  RadioGroup,
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

const RadioSelect = ({ filter, setFilter, optionOne, variants }) => {
  return (
    <RadioGroup defaultValue={filter} value={filter} onChange={setFilter}>
      <Stack direction='row' spacing={4}>
        {optionOne.values.map((value) => {
          return (
            <Radio key={value.value} value={value.value} colorScheme='gray'>
              {value.value}
            </Radio>
          );
        })}
      </Stack>
      <Stack direction='row' spacing={4}>
        {variants.map((variant) => {
          return (
            <Text key={variant.id}>
              ${variant.price}
              {variant.priceV2.currencyCode}
            </Text>
          );
        })}
      </Stack>
    </RadioGroup>
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
const OneOptionProduct = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
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
  }, [quantity]);

  const router = useRouter();

  const handleClick = async () => {
    try {
      await addItemToCart(selected.id, quantity, checkoutId);
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
        <ImageGroup product={product} selected={selected} />

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
          <RadioSelect
            optionOne={optionOne}
            filter={filter}
            setFilter={setFilter}
            variants={product.variants}
          />
          <Quantity
            quantity={quantity}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
          <BuyGroup
            totalPrice={totalPrice}
            currencyCode={selected.priceV2.currencyCode}
            handleClick={handleClick}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default OneOptionProduct;
