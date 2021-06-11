//storefront API Client
import { shopifyClient } from '../utils/client';
//styling
import GridContainer from '../components/layout/GridContainer';
import CollectionCard from '../components/display/CollectionCard';
import { Box } from '@chakra-ui/layout';

const Collections = ({ collections }) => {
  return (
    <Box width='90%' mx='auto' pb='2rem'>
      <GridContainer>
        {collections.map((collection) => {
          return <CollectionCard key={collection.id} collection={collection} />;
        })}
      </GridContainer>
    </Box>
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
