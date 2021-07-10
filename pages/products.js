import { useRouter } from 'next/router';
//storefront graph API Client
import storefrontClient from '../utils/graphClient';
import { gql } from 'graphql-request';
//styling
import ProductCard from '../components/display/ProductCard';
import { SimpleGrid } from '@chakra-ui/react';
import PageSeo from '../components/seo/PageSeo';

const Products = ({ products }) => {
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'All Products',
    description: 'All the products featured in our store',
    currentURL: `https://betterbeer.app${asPath}`,
    previewImage: `${products[0].images.edges[0].node.originalSrc}`,
    siteName: 'NEXT JS and Shopify Demo',
  };
  return (
    <>
      <PageSeo metadata={metadata} />

      <SimpleGrid
        as='main'
        minChildWidth={['18rem', '18rem', '18rem', '20rem']}
        gap='2rem'
        width='90%'
        mx='auto'
        pb='4rem'
      >
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </SimpleGrid>
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
