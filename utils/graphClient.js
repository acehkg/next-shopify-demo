import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.GRAPHQL_ENDPOINT;

const storefrontClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN,
  },
});

export default storefrontClient;
