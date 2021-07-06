import { useRouter } from 'next/router';
//storefront graph API Client
import storefrontClient from '../utils/graphClient';
import { gql } from 'graphql-request';
//styling
import ProductCard from '../components/display/ProductCard';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import PageSeo from '../components/seo/PageSeo';

const Products = ({ products }) => {
  console.log(products);
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'All Products',
    description: 'All the products featured in our store',
    currentURL: `https://next-shopify-demo-three.vercel.app${asPath}`,
    previewImage: `${products[0].images.edges[0].node.originalSrc}`,
    siteName: 'NEXT JS and Shopify Demo',
  };
  return (
    <>
      <PageSeo metadata={metadata} />
      <Box as='main' pb='4rem'>
        <Grid
          sx={{
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          }}
          gap={8}
          ml='5%'
          mr='5%'
        >
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

export default Products;

export async function getStaticProps() {
  //build query for products
  const PRODUCTS_QUERY = gql`
    {
      products(first: 250) {
        edges {
          node {
            id
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
  //query storefront API and fetch  products
  const productsResponse = await storefrontClient.request(PRODUCTS_QUERY);

  return {
    //data needs to be properly formatted
    props: {
      products: productsResponse.products.edges.map((edge) => {
        return edge.node;
      }),
    },
  };
}
