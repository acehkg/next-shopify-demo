//create secure headers
const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: "'self' data:",
              scriptSrc: "'self' 'unsafe-eval' 'unsafe-inline'",
              imageSrc: "'self'  'https://*.shopify.com' ",
              styleSrc: " 'self' 'unsafe-inline'",
              baseURI: "'self'",
              formAction: "'self'",
              frameAncestors: "'none'",
            },
          },
        }),
      },
    ];
  },
  poweredByHeader: false,
  images: {
    domains: ['cdn.shopify.com'],
  },
};
