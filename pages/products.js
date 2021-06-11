//storefront API Client
import { shopifyClient } from '../utils/client';
//styling
import styled from 'styled-components';
import GridContainer from '../components/layout/GridContainer';
import ProductCard from '../components/display/ProductCard';

const Products = ({ products }) => {
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
  min-height: 65%;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

export default Products;

export async function getStaticProps() {
  //query storefront API and fetch all products in shop
  const products = await shopifyClient.product.fetchAll();

  return {
    //data needs to be properly formatted
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
