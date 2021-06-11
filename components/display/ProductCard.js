import Link from 'next/link';
//styling
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiChevronDoubleRight } from 'react-icons/hi';

const CardImage = ({ product, ...rest }) => {
  return (
    <Box {...rest}>
      <Image src={product.images[0].src} alt={product.title} rounded='md' />
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
      <Heading as='h4' fontSize='sm' fontWeight='regular'>
        {description}
      </Heading>
    </Flex>
  );
};

const Price = ({ variants, ...rest }) => {
  //create an array of prices
  const prices = variants.map((variant) => {
    return variant.price;
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
  const shortDescription = filteredDescription[1];
  return (
    <Flex justify='space-evenly' align='center' bg={bg} p='1rem' rounded='md'>
      <Flex direction='column' width='100%' align='center' justify='center'>
        <CardImage
          product={product}
          width={['8.75rem', '9rem', '9rem', '10rem']}
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
          width={['8.75rem', '9rem', '9rem', '10rem']}
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
