import Link from 'next/link';
//styling
import { Heading, Text, Box, Flex, Button, Image } from '@chakra-ui/react';
import { HiChevronDoubleRight } from 'react-icons/hi';

const CardImage = ({ product }) => {
  return <Image src={product.images[0].src} alt={product.title} />;
};

const CardContent = ({ title, description }) => {
  return (
    <Box textAlign='center'>
      <Heading as='h2' pb={'2rem'} fontSize='2xl'>
        {title}
      </Heading>
      <Heading as='h4' fontSize='lg' fontWeight='regular'>
        {description}
      </Heading>
    </Box>
  );
};

const Price = ({ variants }) => {
  //create an array of prices
  const prices = variants.map((variant) => {
    return variant.price;
  });
  //determin whether all prices are the same or not and render appropriate information (price or From Price)
  const allEqual = (arr) => arr.every((v) => v === arr[0]);
  return (
    <Flex pb={'1rem'} pt={'1rem'}>
      {allEqual(prices) ? (
        <Text>${prices[0]}</Text>
      ) : (
        <Text>FROM ${Math.min(...prices)}</Text>
      )}
    </Flex>
  );
};

const ProductCard = ({ product }) => {
  //product description should include h3 tagged short desciption at the top
  const filteredDescription = /<h3>(.*?)<\/h3>/.exec(product.descriptionHtml);
  const shortDescription = filteredDescription[1];
  return (
    <Flex
      maxW='20rem'
      direction='column'
      justify='space-evenly'
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
      <CardImage product={product} />

      <CardContent title={product.title} description={shortDescription} />
      <Price variants={product.variants} />
      <Box pb={'1rem'}>
        <Link href={`/products/${product.handle}`}>
          <Button
            as='a'
            rightIcon={<HiChevronDoubleRight />}
            variant='outline'
            borderRadius='0'
            aria-label='Buy Now'
          >
            BUY NOW
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default ProductCard;
