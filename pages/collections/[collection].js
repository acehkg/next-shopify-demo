import { shopifyClient } from '../../utils/client';
//styling
import styled from 'styled-components';
import GridContainer from '../../components/layout/GridContainer';
import ProductCard from '../../components/display/ProductCard';

const Collection = ({ collection }) => {
  const products = collection.products;
  return (
    <PageWrapper>
      <GridContainer>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </GridContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  min-height: 65%;
  padding-bottom: 2rem;
`;

export default Collection;
export async function getStaticPaths() {
  //query storefron API and fetch all collections
  const collections = await shopifyClient.collection.fetchAllWithProducts();
  const formattedCollections = JSON.parse(JSON.stringify(collections));

  //return handle as paths parameter
  const createPath = (collection) => ({
    params: { collection: collection.handle },
  });
  const paths = formattedCollections.map(createPath);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //get relevant product by querying by handle
  const item = await shopifyClient.collection.fetchByHandle(params.collection);
  return {
    //data needs to be properly formatted
    props: { collection: JSON.parse(JSON.stringify(item)) },
  };
}
