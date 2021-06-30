import { useState, useEffect } from 'react';
//storefront API Client
import { shopifyClient } from '../utils/client';
//storefront Graph Client
import storefrontClient from '../utils/graphClient';
import { gql } from 'graphql-request';
//chakra ui
import {
  Box,
  Grid,
  Text,
  GridItem,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import GridLink from '../components/layout/GridLink';
import ProductCard from '../components/display/ProductCard';
import NextImage from '../components/images/NextImage';
import PageSeo from '../components/seo/PageSeo';
import CookiePop from '../components/modals/CookiePop';
import { useRouter } from 'next/router';

const HomePage = ({ products, collections }) => {
  console.log(products.title);
  const [shouldPop, setShouldPop] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('gray.200', 'gray.700');
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'Home',
    description: 'The Home Page of the Better Beer App',
    currentURL: `https://next-shopify-demo-three.vercel.app${asPath}`,
    previewImage: '/images/logo.png',
    siteName: 'NEXT JS and Shopify Demo',
  };
  useEffect(() => {
    let pop_status = localStorage.getItem('pop_status');
    if (!pop_status) {
      setShouldPop(true);
      localStorage.setItem('pop_status', 1);
      onOpen();
    }
  }, []);

  return (
    <>
      <h1>TEST</h1>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  //build query for all products and  first 3 collections
  const PRODUCTS_QUERY = gql`
    {
      products(first: 250) {
        edges {
          node {
            title
            description
            descriptionHtml
            handle
            images(first: 250) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const COLLECTIONS_QUERY = gql`
    {
      collections(first: 3) {
        edges {
          node {
            title
            handle
            image {
              originalSrc
            }
          }
        }
      }
    }
  `;
  const productsResponse = await storefrontClient.request(PRODUCTS_QUERY);

  const collectionsResponse = await storefrontClient.request(COLLECTIONS_QUERY);

  return {
    props: {
      products: productsResponse.products.edges.map((node) => node),
      collections: collectionsResponse.collections.edges.map((node) => node),
    },
  };
}

// <PageSeo metadata={metadata} />
//     <Box pb='2rem'>
//       <Grid
//         sx={{
//           gridTemplateColumns:
//             'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
//         }}
//         /* templateRows={['repeat(6, 1fr)', 'repeat(6, 1fr)', 'repeat(2,1fr)']}
//       templateColumns={['repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']}*/
//         gap={8}
//         ml='5%'
//         mr='5%'
//         pb='2rem'
//       >
//         <GridLink href={`/collections/${collections[0].handle}`}>
//           <NextImage
//             src={collections[0].image.src}
//             alt={collections[0].title}
//             rounding='var(--chakra-radii-md)'
//             height={512}
//             width={768}
//             layout='responsive'
//           />
//         </GridLink>
//         <GridLink href={`/collections/${collections[1].handle}`}>
//           <NextImage
//             src={collections[1].image.src}
//             alt={collections[1].title}
//             rounding='var(--chakra-radii-md)'
//             height={512}
//             width={768}
//             layout='responsive'
//           />
//         </GridLink>
//         <GridLink href={`/collections/${collections[2].handle}`}>
//           <NextImage
//             src={collections[2].image.src}
//             alt={collections[2].title}
//             rounding='var(--chakra-radii-md)'
//             height={512}
//             width={768}
//             layout='responsive'
//           />
//         </GridLink>

//         {products.map((product) => {
//           return (
//             <GridItem key={product.id}>
//               <ProductCard product={product} />
//             </GridItem>
//           );
//         })}
//       </Grid>
//     </Box>
//     {shouldPop ? <CookiePop isOpen={isOpen} onClose={onClose} /> : null}
