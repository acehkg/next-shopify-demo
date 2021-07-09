require('dotenv').config();
const fs = require('fs');
const { GraphQLClient, gql } = require('graphql-request');

const endpoint = process.env.SHOPIFY_GRAPH_DOMAIN;

const storefrontClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN,
  },
});

const getLinks = async () => {
  //query Shopify API to receive category slugs
  const COLLECTIONS_QUERY = gql`
    {
      collections(first: 250) {
        edges {
          node {
            title
            handle
          }
        }
      }
    }
  `;
  try {
    const { collections } = await storefrontClient.request(COLLECTIONS_QUERY);
    const formattedCollections = collections.edges.map((edge) => {
      return edge.node;
    });
    const links = formattedCollections.map((collection) => {
      return { handle: collection.handle, title: collection.title };
    });

    //write output to a links.json file
    const filepath = `${process.cwd()}/utils/links.json`;
    fs.writeFileSync(filepath, JSON.stringify(links));
  } catch (error) {
    console.log(error);
  }
};

const getPolicies = async () => {
  const POLICIES_QUERY = gql`
    {
      shop {
        privacyPolicy {
          title
          url
        }
        refundPolicy {
          title
          url
        }
        termsOfService {
          title
          url
        }
      }
    }
  `;
  //query Shopify API to receive policy title and URL's
  try {
    const { shop } = await storefrontClient.request(POLICIES_QUERY);
    //write output to a links.json file
    const filepath = `${process.cwd()}/utils/policies.json`;
    fs.writeFileSync(filepath, JSON.stringify(shop));
  } catch (error) {
    console.log(error);
  }
};

getPolicies();
getLinks();
