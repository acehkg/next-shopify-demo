import { useState, useEffect } from 'react';
import Link from 'next/link';
//cart context and data
import useCartContext from '../../hooks/useCartContext';
import { mutate } from 'swr';
//styling
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  Image,
  Box,
  Flex,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { Select, Icon } from 'semantic-ui-react';

const CardImage = ({ product, variant }) => {
  //filter for and display image of selected variant
  const variantSelected = product.variants.filter((v) => v.id === variant);

  return <CustomImage src={variantSelected[0].image.src} alt={product.title} />;
};

const CustomImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = ({ title, description }) => {
  return (
    <Box textAlign='center'>
      <Heading as='h2' pb={'2rem'}>
        {title}
      </Heading>
      <Text pb={'2rem'}>{description}</Text>
    </Box>
  );
};

const OptionsSelect = ({ options, onChange }) => {
  return (
    <SelectWrapper>
      <Select
        placeholder='Select Options'
        options={options}
        onChange={onChange}
        aria-label='select options'
      />
    </SelectWrapper>
  );
};
const SelectWrapper = styled.div`
  padding: 0 1rem;
`;

const BuyButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <Button icon onClick={onClick} aria-label='Buy Now'>
        <Icon name='add to cart' />
      </Button>
    </ButtonWrapper>
  );
};
const ButtonWrapper = styled.div`
  padding-right: 0.75rem;
`;

const BuyNow = ({ options, onChange, onClick, variants, oneVariant }) => {
  //if no variants render a buy button only else render the select
  if (variants.length === 1) {
    useEffect(() => {
      oneVariant(variants[0].id);
    }, []);

    return (
      <OneWrapper>
        <OnePrice>${variants[0].price}</OnePrice>
        <BuyButton onClick={onClick} />
      </OneWrapper>
    );
  }

  return (
    <BuyWrapper>
      <OptionsSelect options={options} onChange={onChange} />
      <BuyButton onClick={onClick} />
    </BuyWrapper>
  );
};

const BuyWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 1rem;
`;

const OneWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 1rem;
`;
const OnePrice = styled.p``;
const ProductCard = ({ product }) => {
  //retrieve checkout ID and funtions from cart context for adding to cart
  const { addItemToCart, checkoutId } = useCartContext();

  //function to create the options array for the semantic UI react select component
  const selectOptions = product.variants.map((variant) => {
    return {
      key: variant.id,
      value: variant.id,
      text:
        variant.title +
        ' ' +
        '$' +
        variant.price +
        variant.priceV2.currencyCode,
    };
  });

  //set state of selected variant
  const variants = product.variants;
  const [selected, setSelected] = useState(variants[0].id);

  //evetn handler for add to cart button
  const handleClick = async () => {
    try {
      await addItemToCart(selected, 1, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error adding item to cart...');
      console.log(e);
    }
  };
  //evetn handler for change dropdown value
  const selectChange = (e, data) => {
    e.preventDefault();
    setSelected(data.value);
  };

  //only one variant
  const oneVariant = (id) => {
    setSelected(id);
  };
  return (
    <Flex
      maxW='20rem'
      direction='column'
      justify='space-between'
      align='center'
      boxShadow={['none', 'md', 'md']}
      _hover={[
        { boxShadow: 'none' },
        { boxShadow: 'lg' },
        { boxShadow: 'lg' },
        { boxShadow: 'lg' },
      ]}
      rounded='md'
      p={4}
    >
      <CardImage product={product} variant={selected} />

      <CardContent title={product.title} description={product.description} />
      <Box pb={'1rem'}>
        <Link href={`/products/${product.handle}`}>
          <Button as='a' colorScheme='gray' mb={'2rem'} size='lg'>
            PRODUCT DETAILS
          </Button>
        </Link>
      </Box>
      <BuyNow
        options={selectOptions}
        onChange={selectChange}
        onClick={handleClick}
        variants={variants}
        oneVariant={oneVariant}
        selected={selected}
      />
    </Flex>
  );
};

const DetailsWrapper = styled.div`
  padding-bottom: 1rem;
`;
export default ProductCard;
