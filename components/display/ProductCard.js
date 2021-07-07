import Link from 'next/link';
//styling
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import NextImage from '../images/NextImage';

const CardImage = ({ product, ...rest }) => {
  //if no product image return a placeholder
  if (product.images.edges.length === 0) {
    return (
      <Box {...rest}>
        <NextImage
          src='/images/comingsoon.jpg'
          alt={product.title}
          height={512}
          width={768}
          layout='responsive'
          rounding='var(--chakra-radii-md)'
          quality={50}
        />
      </Box>
    );
  }
  return (
    <Box {...rest}>
      <NextImage
        src={product.images.edges[0].node.originalSrc}
        alt={product.title}
        height={577}
        width={768}
        layout='responsive'
        rounding='var(--chakra-radii-md)'
        quality={50}
      />
    </Box>
  );
};

const CardContent = ({ title, description, ...rest }) => {
  return (
    <Flex
      direction='column'
      align='center'
      justify='flex-start'
      textAlign='center'
      height='8rem'
      {...rest}
    >
      <Heading as='h2' fontSize='md' py='.5rem'>
        {title}
      </Heading>
      <Heading as='h3' fontSize='sm' fontWeight='regular'>
        {description}
      </Heading>
    </Flex>
  );
};

const Price = ({ variants, ...rest }) => {
  //create an array of prices
  const prices = variants.edges.map((variant) => {
    const pFloat = parseFloat(variant.node.priceV2.amount);
    const price = pFloat.toFixed(2);
    return price;
  });
  //determin whether all prices are the same or not and render appropriate information (price or From Price)
  const allEqual = (arr) => arr.every((v) => v === arr[0]);
  return (
    <Flex {...rest}>
      {allEqual(prices) ? (
        <Text>${prices[0]}</Text>
      ) : (
        <Text>FROM ${Math.min(...prices)}</Text>
      )}
    </Flex>
  );
};

const ProductCard = ({ product }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const buttonBorder = useColorModeValue('gray.700', 'gray.100');
  //product description should include h3 tagged short desciption at the top
  const filteredDescription = /<h3>(.*?)<\/h3>/.exec(product.descriptionHtml);
  //if no h3 tage return the title
  let shortDescription;
  if (filteredDescription === null) {
    shortDescription = product.title;
  } else {
    shortDescription = filteredDescription[1];
  }

  return (
    <Flex
      justify='space-evenly'
      align='center'
      bg={bg}
      p='1rem'
      rounded='md'
      minW='17rem'
    >
      <Flex
        direction='column'
        width='300px'
        minHeight='12rem'
        align='center'
        justify='center'
      >
        <CardImage
          product={product}
          width={['150px', '150px', '150px', '175px', '200px']}
          height='auto'
        />
        <Price variants={product.variants} pt='1rem' />
      </Flex>

      <Flex
        direction='column'
        align='center'
        justify='space-between'
        pl='.5rem'
      >
        <CardContent
          title={product.title}
          description={shortDescription}
          width='100%'
        />

        <Box>
          <Link href={`/products/${product.handle}`}>
            <Button
              as='a'
              rightIcon={<HiChevronDoubleRight />}
              variant='outline'
              rounded='md'
              borderColor={buttonBorder}
              aria-label='Buy Now'
            >
              BUY NOW
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
