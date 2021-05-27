//script to use pre-build an array of links of the various collections
require('dotenv').config();
const fs = require('fs');
const Client = require('shopify-buy');

const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});

const getLinks = async () => {
  //query shopify to receive category handles
  try {
    const response = await shopifyClient.collection.fetchAll();
    const json = await response.json();
    const links = json.result.map((collection) => {
      return collection.handle;
    });
    const filepath = `${process.cwd()}/utils/links.json`;
    fs.writeFileSync(filepath, JSON.stringify(links));
  } catch (error) {
    console.log(error);
  }
};
getLinks();
