import { useRouter } from 'next/router';
//storefront Graph Client
import storefrontClient from '../utils/graphClient';
import { gql } from 'graphql-request';
//styling
import CollectionCard from '../components/display/CollectionCard';
import { SimpleGrid } from '@chakra-ui/react';
import PageSeo from '../components/seo/PageSeo';

const Collections = ({ collections }) => {
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'Collections',
    description: 'All the collections featured in our store',
    currentURL: `https://next-shopify-demo-three.vercel.app${asPath}`,
    previewImage: `${collections[0].image.originalSrc}`,
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
        {collections.map((collection) => {
          return <CollectionCard key={collection.id} collection={collection} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default Collections;

export async function getStaticProps() {
  //query for all collections
  const COLLECTIONS_QUERY = gql`
    {
      collections(first: 250) {
        edges {
          node {
            id
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
  //query storefront API and fetch collections
  const collectionsResponse = await storefrontClient.request(COLLECTIONS_QUERY);

  return {
    //data needs to be properly formatted
    props: {
      collections: collectionsResponse.collections.edges.map((edge) => {
        return edge.node;
      }),
    },
  };
}
