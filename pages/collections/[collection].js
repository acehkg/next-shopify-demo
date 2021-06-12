import { useRouter } from 'next/router';
import { shopifyClient } from '../../utils/client';
//styling
import GridContainer from '../../components/layout/GridContainer';
import ProductCard from '../../components/display/ProductCard';
import { Box } from '@chakra-ui/layout';
import CollectionSeo from '../../components/seo/CollectionSeo';

const Collection = ({ collection }) => {
  const { asPath } = useRouter();
  const siteName = 'NEXT JS and Shopify';
  const url = `https://next-shopify-demo-three.vercel.app${asPath}`;

  const products = collection.products;

  return (
    <>
      <CollectionSeo collection={collection} url={url} siteName={siteName} />
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
