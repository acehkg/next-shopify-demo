require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const Client = require('shopify-buy');

const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});

global.fetch = fetch;
const getLinks = async () => {
  //query Shopify API to receive category slugs
  try {
    const collections = await shopifyClient.collection.fetchAll();
    const formattedCollections = JSON.parse(JSON.stringify(collections));
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
  //query Shopify API to receive category slugs
  try {
    const policies = await shopifyClient.shop.fetchPolicies();
    const formattedPolicies = JSON.parse(JSON.stringify(policies));

    //write output to a links.json file
    const filepath = `${process.cwd()}/utils/policies.json`;
    fs.writeFileSync(filepath, JSON.stringify(formattedPolicies));
  } catch (error) {
    console.log(error);
  }
};

getPolicies();
getLinks();
