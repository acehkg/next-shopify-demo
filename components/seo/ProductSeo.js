import Head from 'next/head';

const ProductSeo = ({ metadata }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta name='description' content={metadata.description}></meta>
      <meta property='og:title' content={metadata.pageTitle} key='ogtitle' />
      <meta
        property='og:description'
        content={metadata.description}
        key='ogdesc'
      />
      {/* Twitter */}
      <meta name='twitter:card' content='summary' key='twcard' />

      {/* Open Graph */}
      <meta property='og:url' content={metadata.currentURL} key='ogurl' />
      <meta property='og:image' content={metadata.previewImage} key='ogimage' />
      <meta
        property='og:site_name'
        content={metadata.siteName}
        key='ogsitename'
      />
      <meta property='og:title' content={metadata.pageTitle} key='ogtitle' />
      <meta
        property='og:description'
        content={metadata.description}
        key='ogdesc'
      />

      <title>{metadata.pageTitle}</title>
    </Head>
  );
};

export default ProductSeo;
