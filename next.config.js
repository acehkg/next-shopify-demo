//create secure headers
const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
  poweredByHeader: false,
  images: {
    domains: ['cdn.shopify.com'],
  },
};
