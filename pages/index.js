import { useEffect } from 'react';
//storefront Graph Client
import storefrontClient from '../utils/graphClient';
import { gql } from 'graphql-request';
//chakra ui
import { useToast, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import GridLink from '../components/layout/GridLink';
import ProductCard from '../components/display/ProductCard';
import NextImage from '../components/images/NextImage';
import PageSeo from '../components/seo/PageSeo';
import CookieToast from '../components/modals/CookieToast';
import { useRouter } from 'next/router';

const HomePage = ({ products, collections }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  const color = useColorModeValue('black', 'white');
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'Home',
    description: 'The Home Page of the Better Beer App',
    currentURL: `https://betterbeer.app${asPath}`,
    previewImage: 'https://betterbeer.app/images/logo.png',
    siteName: 'NEXT JS and Shopify Demo',
  };

  const toast = useToast();
  useEffect(() => {
    let pop_status = localStorage.getItem('pop_status');
    if (!pop_status) {
      localStorage.setItem('pop_status', 1);
      toast({
        duration: 5000,
        render: () => <CookieToast bg={bg} color={color} />,
      });
    }
  }, []);

  return (
    <>
      <PageSeo metadata={metadata} />

      <SimpleGrid
        as='section'
        minChildWidth={['18rem', '18rem', '18rem', '20rem']}
        gap='2rem'
        width='90%'
        mx='auto'
        pb='4rem'
      >
        <GridLink href={`/collections/${collections[0].handle}`}>
          <NextImage
            src={collections[0].image.originalSrc}
            alt={collections[0].title}
            rounding='var(--chakra-radii-md)'
            height={512}
            width={768}
            layout='responsive'
          />
        </GridLink>
        <GridLink href={`/collections/${collections[1].handle}`}>
          <NextImage
            src={collections[1].image.originalSrc}
            alt={collections[1].title}
            rounding='var(--chakra-radii-md)'
            height={512}
            width={768}
            layout='responsive'
          />
        </GridLink>
        <GridLink href={`/collections/${collections[2].handle}`}>
          <NextImage
            src={collections[2].image.originalSrc}
            alt={collections[2].title}
            rounding='var(--chakra-radii-md)'
            height={512}
            width={768}
            layout='responsive'
          />
        </GridLink>

        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  //build query for all products and  first 3 collections
  const PRODUCTS_QUERY = gql`
    {
      products(first: 250) {
        edges {
          node {
            id
            title
            description
            descriptionHtml
            handle
            images(first: 250) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const COLLECTIONS_QUERY = gql`
    {
      collections(first: 3) {
        edges {
          node {
            title
            handle
            image {
              originalSrc
            }
          }
        }
      }
    }
  `;
  const productsResponse = await storefrontClient.request(PRODUCTS_QUERY);

  const collectionsResponse = await storefrontClient.request(COLLECTIONS_QUERY);

  return {
    props: {
      products: productsResponse.products.edges.map((edge) => {
        return edge.node;
      }),

      collections: collectionsResponse.collections.edges.map((edge) => {
        return edge.node;
      }),
    },
  };
}
