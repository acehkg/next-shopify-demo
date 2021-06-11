//storefront API Client
import { shopifyClient } from '../utils/client';
//chakra ui
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import GridLink from '../components/layout/GridLink';
import GridImage from '../components/images/GridImage';

const HomePage = ({ products, collections }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minHeight='65%' pb='2rem'>
      <Grid
        templateRows='repeat(4, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={4}
        ml='5%'
        mr='5%'
      >
        <GridLink
          href={`/collections/${collections[0].handle}`}
          colSpan={4}
          rowSpan={2}
        >
          <Image
            src={collections[0].image.src}
            alt={collections[0].title}
            rounded='md'
          />
        </GridLink>
        <GridLink
          href={`/collections/${collections[1].handle}`}
          colSpan={2}
          rowSpan={1}
        >
          <Image
            src={collections[1].image.src}
            alt={collections[1].title}
            rounded='md'
          />
        </GridLink>
        <GridLink
          href={`/collections/${collections[2].handle}`}
          colSpan={2}
          rowSpan={1}
        >
          <Image
            src={collections[2].image.src}
            alt={collections[2].title}
            rounded='md'
          />
        </GridLink>
        <GridLink href='/products' colSpan={4} rowSpan={1} bg={bg} rounded='md'>
          <Flex justify='center' align='center' width='100%' height='100%'>
            <Text fontSize='1.5rem'>ALL PRODUCTS</Text>
          </Flex>
        </GridLink>
      </Grid>
    </Box>
  );
};

export default HomePage;

export async function getStaticProps() {
  //query storefront API and fetch all products in shop
  const products = await shopifyClient.product.fetchAll();
  //query storefront API and fetch all collections in shop
  const collections = await shopifyClient.collection.fetchAll();

  return {
    //data needs to be properly formatted
    props: {
      products: JSON.parse(JSON.stringify(products)),
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
}
