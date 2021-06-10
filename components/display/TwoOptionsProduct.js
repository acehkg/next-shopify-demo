import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//chakra ui
import { Flex, Stack, Text, Heading } from '@chakra-ui/react';
//components
import ProductImage from '../images/ProductImage';
import QuantityAdjust from '../interface/QuantityAdjust';
import SelectGroup from '../interface/SelectGroup';
import BuyButton from '../interface/BuyButton';

const TwoOptionProduct = ({ product }) => {
  console.log(product);
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
  }, [quantity, selected]);
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
        <ProductImage product={product} selected={selected} />
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
            <SelectGroup
              values={optionOne.values}
              onChange={handleChangeOne}
              size='lg'
            />
            <SelectGroup
              values={optionTwo.values}
              onChange={handleChangeTwo}
              size='lg'
            />
          </Stack>

          <QuantityAdjust
            pt='2rem'
            spacing={8}
            quantity={quantity}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
          <BuyButton
            totalPrice={totalPrice}
            currencyCode={selected.priceV2.currencyCode}
            handleClick={handleClick}
            quantity={quantity}
            title={product.title}
            marginY='2rem'
          />
        </Flex>
      </Flex>
    </>
  );
};

export default TwoOptionProduct;
