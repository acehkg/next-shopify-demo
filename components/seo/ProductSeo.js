import Head from 'next/head';

const ProductSeo = ({ product, url, siteName }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta name='description' content={product.description}></meta>
      <meta property='og:title' content={product.title} key='ogtitle' />
      <meta
        property='og:description'
        content={product.description}
        key='ogdesc'
      />
      {/* Twitter */}
      <meta name='twitter:card' content='summary' key='twcard' />

      {/* Open Graph */}
      <meta property='og:url' content={url} key='ogurl' />
      <meta property='og:image' content={product.images[0].src} key='ogimage' />
      <meta property='og:site_name' content={siteName} key='ogsitename' />
      <meta property='og:title' content={product.title} key='ogtitle' />
      <meta
        property='og:description'
        content={product.description}
        key='ogdesc'
      />

      <title>{product.title}</title>
    </Head>
  );
};

export default ProductSeo;
