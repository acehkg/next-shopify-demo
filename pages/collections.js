//storefront API Client
import { shopifyClient } from '../utils/client';
//styling
import styled from 'styled-components';
import GridContainer from '../components/layout/GridContainer';
import CollectionCard from '../components/display/CollectionCard';

const Collections = ({ collections }) => {
  return (
    <PageWrapper>
      <GridContainer>
        {collections.map((collection) => {
          return <CollectionCard key={collection.id} collection={collection} />;
        })}
      </GridContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export default Collections;

export async function getStaticProps() {
  //query storefront API and fetch all products in shop
  const collections = await shopifyClient.collection.fetchAll();

  return {
    //data needs to be properly formatted
    props: { collections: JSON.parse(JSON.stringify(collections)) },
  };
}
