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
  Select,
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

const SelectGroup = ({ values, onChange }) => {
  return (
    <Select size='lg' onChange={onChange}>
      {values.map((value) => {
        return (
          <option key={value.value} value={value.value}>
            {value.value}
          </option>
        );
      })}
    </Select>
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
const TwoOptionProduct = ({ product }) => {
  //checkoutid
  const { checkoutId, addItemToCart } = useCartContext();
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
  const [selected, setSelected] = useState(product.variants[0]);
  useEffect(() => {
    const filtered = product.variants.filter((variant) => {
      return variant.title.includes(filter);
    });
    setSelected(() => filtered[0]);
  }, [filter]);

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

  //set respective states from the individual selects
  const handleChangeOne = (e) => {
    e.preventDefault();
    setSelectOne(() => e.target.value);
  };

  const handleChangeTwo = (e) => {
    e.preventDefault();
    setSelectTwo(() => e.target.value);
  };

  const incrementQty = () => {
    setQuantity(() => quantity + 1);
  };

  const decrementQty = () => {
    quantity === 1 ? setQuantity(1) : setQuantity(() => quantity - 1);
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
          <Stack
            direction='row'
            spacing={2}
            width={['19rem', '19rem', '20rem', '20rem']}
          >
            <SelectGroup values={optionOne.values} onChange={handleChangeOne} />
            <SelectGroup values={optionTwo.values} onChange={handleChangeTwo} />
          </Stack>

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

export default TwoOptionProduct;
