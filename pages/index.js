//storefront API Client
import { shopifyClient } from '../utils/client';
//chakra ui
import { Box, Grid, Text, GridItem, useColorModeValue } from '@chakra-ui/react';
import GridLink from '../components/layout/GridLink';
import ProductCard from '../components/display/ProductCard';
import NextImage from '../components/images/NextImage';
import PageSeo from '../components/seo/PageSeo';
import { useRouter } from 'next/router';

const HomePage = ({ products, collections }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  const { pathname } = useRouter();
  const metadata = {
    pageTitle: 'Home',
    description: 'The Home Page of the Better Beer App',
    currentURL: `${pathname}`,
    previewImage: '/images/logo.png',
    siteName: 'NEXT JS and Shopify Demo',
  };

  return (
    <>
      <PageSeo metadata={metadata} />
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
            <NextImage
              src={collections[0].image.src}
              alt={collections[0].title}
              rounding='var(--chakra-radii-md)'
              height={512}
              width={768}
              layout='responsive'
            />
          </GridLink>
          <GridLink href={`/collections/${collections[1].handle}`}>
            <NextImage
              src={collections[1].image.src}
              alt={collections[1].title}
              rounding='var(--chakra-radii-md)'
              height={512}
              width={768}
              layout='responsive'
            />
          </GridLink>
          <GridLink href={`/collections/${collections[2].handle}`}>
            <NextImage
              src={collections[2].image.src}
              alt={collections[2].title}
              rounding='var(--chakra-radii-md)'
              height={512}
              width={768}
              layout='responsive'
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
                THIS SAMPLE APPLICATION BRINGS THE SPEED, POWER AND
                ACCESSABILITY OF AN ADVANCED FRAMEWORK TO SHOPIFY. THIS IS A
                LIVE DEMO CONNECTED TO A DEVELOPMENT STORE. PLEASE EXPLORE AND
                ENJOY. THE STYLING IS BASIC BUT IS 100% CUSTOMIZABLE TO ANY
                DESIGN YOU WOULD LIKE.
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
    </>
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
