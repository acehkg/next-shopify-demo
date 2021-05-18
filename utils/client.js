import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
export const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});
