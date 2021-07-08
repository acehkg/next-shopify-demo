import { useRouter } from 'next/router';
//storefront Graph Client
import storefrontClient from '../../utils/graphClient';
import { gql } from 'graphql-request';
//styling
import GridContainer from '../../components/layout/GridContainer';
import ProductCard from '../../components/display/ProductCard';
import { Box, SimpleGrid } from '@chakra-ui/react';
import CollectionSeo from '../../components/seo/CollectionSeo';

const Collection = ({ collection }) => {
  const { asPath } = useRouter();
  const siteName = 'NEXT JS and Shopify';
  const url = `https://next-shopify-demo-three.vercel.app${asPath}`;

  const products = collection.products.edges.map((edge) => {
    return edge.node;
  });
  return (
    <>
      <CollectionSeo collection={collection} url={url} siteName={siteName} />
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

export default Collection;
export async function getStaticPaths() {
  //query storefron API and fetch all collections
  const COLLECTIONS_QUERY = gql`
    {
      collections(first: 250) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  //query storefront API and fetch collections
  const collectionsResponse = await storefrontClient.request(COLLECTIONS_QUERY);

  const formattedCollections = collectionsResponse.collections.edges.map(
    (edge) => {
      return edge.node;
    }
  );
  //return handle as paths parameter
  const createPath = (item) => ({
    params: { collection: item.handle },
  });
  const paths = formattedCollections.map(createPath);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const QUERY_HANDLE = gql`
    {
      collectionByHandle(handle: "${params.collection}") {
        title
        image{
          originalSrc
        }
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              images(first: 250) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
              options {
                values
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    availableForSale
                    image {
                      originalSrc
                    }
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
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
  const { collectionByHandle } = await storefrontClient.request(QUERY_HANDLE);

  return {
    //data needs to be properly formatted
    props: {
      collection: collectionByHandle,
    },
  };
}
