//global styles and styles for components
import GlobalStyles from '../style/GlobalStyles';
//Chakra UI
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../style/customTheme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
//Cart Context
import CartProvider from '../context/CartContext';
//cookies provider
import { CookiesProvider } from 'react-cookie';
//Layout Components
import Header from '../components/header/Header';
import Breadcumb from '../components/interface/Breadcrumb';
import Footer from '../components/footer/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <CookiesProvider>
          <CartProvider>
            <Header />
            <Breadcumb />
            <Component {...pageProps} />
            <Footer />
          </CartProvider>
        </CookiesProvider>
      </ChakraProvider>
      <GlobalStyles />
    </>
  );
}

export default MyApp;
