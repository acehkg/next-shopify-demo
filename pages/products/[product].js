import { useRouter } from 'next/router';
//storefront graph API Client
import storefrontClient from '../../utils/graphClient';
import { gql } from 'graphql-request';
import NoOptionProduct from '../../components/display/NoOptionProduct';
import OneOptionProduct from '../../components/display/OneOptionProduct';
import TwoRadioSelectors from '../../components/display/TwoRadioSelectors';
import ProductSeo from '../../components/seo/ProductSeo';

const Product = ({ product }) => {
  const { asPath } = useRouter();
  const siteName = 'NEXT JS and Shopify';
  const url = `https://next-shopify-demo-three.vercel.app${asPath}`;

  if (product.variants.edges.length === 1) {
    return (
      <>
        <ProductSeo product={product} url={url} siteName={siteName} />
        <NoOptionProduct product={product} />
      </>
    );
  }
  if (product.options.length === 1) {
    return (
      <>
        <ProductSeo product={product} url={url} siteName={siteName} />
        <OneOptionProduct product={product} />
      </>
    );
  }
  if (product.options.length === 2) {
    return (
      <>
        <ProductSeo product={product} url={url} siteName={siteName} />
        <TwoRadioSelectors product={product} />
      </>
    );
  }
};

export default Product;

export async function getStaticPaths() {
  //build query for products
  const PRODUCTS_QUERY = gql`
    {
      products(first: 250) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  //query storefront API and fetch  products
  const productsResponse = await storefrontClient.request(PRODUCTS_QUERY);

  const formattedProducts = productsResponse.products.edges.map((edge) => {
    return edge.node;
  });
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
  const QUERY_HANDLE = gql`
    {
      productByHandle(handle:"${params.product}") {
        title
        description
        images(first:250){
          edges{
          node{
            originalSrc
        }
      }
    }
        options {
          values
        }
        variants(first: 250) {
          edges {
            node {
              id
              availableForSale
              image{
                originalSrc
              }
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  //query storefront API and fetch  products
  const { productByHandle } = await storefrontClient.request(QUERY_HANDLE);
  return {
    //data needs to be properly formatted
    props: {
      product: productByHandle,
    },
  };
}
