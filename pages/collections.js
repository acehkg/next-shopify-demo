import { useRouter } from 'next/router';
//storefront API Client
import { shopifyClient } from '../utils/client';
//styling
import GridContainer from '../components/layout/GridContainer';
import CollectionCard from '../components/display/CollectionCard';
import { Box } from '@chakra-ui/layout';
import PageSeo from '../components/seo/PageSeo';

const Collections = ({ collections }) => {
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'Collections',
    description: 'All the collections featured in our store',
    currentURL: `https://next-shopify-demo-three.vercel.app${asPath}`,
    previewImage: `${collections[0].image.src}`,
    siteName: 'NEXT JS and Shopify Demo',
  };
  return (
    <>
      <PageSeo metadata={metadata} />
      <Box width='90%' mx='auto' pb='2rem'>
        <GridContainer>
          {collections.map((collection) => {
            return (
              <CollectionCard key={collection.id} collection={collection} />
            );
          })}
        </GridContainer>
      </Box>
    </>
  );
};

export default Collections;

export async function getStaticProps() {
  //query storefront API and fetch all products in shop
  const collections = await shopifyClient.collection.fetchAll();

  return {
    //data needs to be properly formatted
    props: { collections: JSON.parse(JSON.stringify(collections)) },
  };
}
