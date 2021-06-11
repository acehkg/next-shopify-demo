//storefront API Client
import { shopifyClient } from '../utils/client';
//chakra ui
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react';
import GridLink from '../components/layout/GridLink';
import ProductCard from '../components/display/ProductCard';
import GridContainer from '../components/layout/GridContainer';

const HomePage = ({ products, collections }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box pb='2rem'>
      <Grid
        sx={{
          gridTemplateColumns:
            'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        }}
        /* templateRows={['repeat(6, 1fr)', 'repeat(6, 1fr)', 'repeat(2,1fr)']}
        templateColumns={['repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']}*/
        gap={8}
        ml='5%'
        mr='5%'
        pb='2rem'
      >
        <GridLink href={`/collections/${collections[0].handle}`}>
          <Image
            src={collections[0].image.src}
            alt={collections[0].title}
            rounded='md'
          />
        </GridLink>
        <GridLink href={`/collections/${collections[1].handle}`}>
          <Image
            src={collections[1].image.src}
            alt={collections[1].title}
            rounded='md'
          />
        </GridLink>
        <GridLink href={`/collections/${collections[2].handle}`}>
          <Image
            src={collections[2].image.src}
            alt={collections[2].title}
            rounded='md'
          />
        </GridLink>
        <GridItem>
          <Box
            bg={bg}
            rounded='md'
            position='relative'
            height={['220px', '100%']}
            width='100%'
            position='relative'
          >
            <Text
              fontSize='sm'
              position='absolute'
              p='1rem'
              textAlign='center'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              width='100%'
            >
              THIS SAMPLE APPLICATION BRINGS THE SPEED, POWER AND ACCESSABILITY
              OF AN ADVANCED FRAMEWORK TO SHOPIFY. THIS IS A LIVE DEMO CONNECTED
              TO A DEVELOPMENT STORE. PLEASE EXPLORE AND ENJOY. THE STYLING IS
              BASIC BUT IS 100% CUSTOMIZABLE TO ANY DESIGN YOU WOULD LIKE.
            </Text>
          </Box>
        </GridItem>

        {products.map((product) => {
          return (
            <GridItem key={product.id}>
              <ProductCard product={product} />
            </GridItem>
          );
        })}
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
