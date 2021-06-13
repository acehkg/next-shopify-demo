import Head from 'next/head';

const PageSeo = ({ metadata }) => {
  return (
    <Head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />

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

export default PageSeo;
