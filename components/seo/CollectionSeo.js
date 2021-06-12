import Head from 'next/head';

const CollectionSeo = ({ collection, url, siteName }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta name='description' content={collection.description}></meta>
      <meta property='og:title' content={collection.title} key='ogtitle' />
      <meta
        property='og:description'
        content={collection.description}
        key='ogdesc'
      />
      {/* Twitter */}
      <meta name='twitter:card' content='summary' key='twcard' />

      {/* Open Graph */}
      <meta property='og:url' content={url} key='ogurl' />
      <meta property='og:image' content={collection.image.src} key='ogimage' />
      <meta property='og:site_name' content={siteName} key='ogsitename' />
      <meta property='og:title' content={collection.title} key='ogtitle' />
      <meta
        property='og:description'
        content={collection.description}
        key='ogdesc'
      />

      <title>{collection.title}</title>
    </Head>
  );
};

export default CollectionSeo;
