import { useRouter } from 'next/router';
//storefront API Client
import { shopifyClient } from '../utils/client';
//styling
import GridContainer from '../components/layout/GridContainer';
import ProductCard from '../components/display/ProductCard';
import { Box } from '@chakra-ui/layout';
import PageSeo from '../components/seo/PageSeo';

const Products = ({ products }) => {
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'All Products',
    description: 'All the products featured in our store',
    currentURL: `https://next-shopify-demo-three.vercel.app${asPath}`,
    previewImage: `${products[0].images[0].src}`,
    siteName: 'NEXT JS and Shopify Demo',
  };
  return (
    <>
      <PageSeo metadata={metadata} />
      <Box as='main' width='90%' mx='auto' pb='2rem'>
        <GridContainer>
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </GridContainer>
      </Box>
    </>
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
