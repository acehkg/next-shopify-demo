//storefront API Client
import { shopifyClient } from '../utils/client';
//styling
import GridContainer from '../components/layout/GridContainer';
import ProductCard from '../components/display/ProductCard';
import { Box } from '@chakra-ui/layout';

const Products = ({ products }) => {
  return (
    <Box as='main' width='90%' mx='auto' pb='2rem'>
      <GridContainer>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </GridContainer>
    </Box>
  );
};

export default Products;

export async function getStaticProps() {
  //query storefront API and fetch all products in shop
  const products = await shopifyClient.product.fetchAll();

  return {
    //data needs to be properly formatted
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
