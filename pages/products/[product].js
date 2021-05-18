import { shopifyClient } from '../../utils/client';

const Product = ({ product }) => {
  return <h1>{product.title}</h1>;
};
export default Product;

export async function getStaticPaths() {
  //query storefron API and fetch all products
  const products = await shopifyClient.product.fetchAll();
  const formattedProducts = JSON.parse(JSON.stringify(products));
  //return handle as paths parameter
  const createPath = (item) => ({
    params: { product: item.handle },
  });
  const paths = formattedProducts.map(createPath);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //get relevant product by querying by handle
  const item = await shopifyClient.product.fetchByHandle(params.product);
  return {
    //data needs to be properly formatted
    props: { product: JSON.parse(JSON.stringify(item)) },
  };
}
