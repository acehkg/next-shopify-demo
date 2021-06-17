import { useEffect, useState } from 'react';
//global styles and styles for components
import GlobalStyles from '../style/GlobalStyles';
//Chakra UI
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../style/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
//Cart Context
import CartProvider from '../context/CartContext';
//cookies provider
import { CookiesProvider, useCookies } from 'react-cookie';
//Layout Components
import Header from '../components/header/Header';
import Breadcumb from '../components/interface/Breadcrumb';
import Footer from '../components/footer/Footer';

function MyApp({ Component, pageProps }) {
  const [checkout, setCheckout] = useState();
  const [cookies, setCookie] = useCookies(['checkout_id']);

  //retrieve existing checkout from cookies or create a new checkout
  useEffect(async () => {
    let checkoutId = cookies;
    let date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    try {
      if (Object.keys(checkoutId).length === 0) {
        const res = await fetch('/api/createCheckout');
        const createdCheckout = await res.json();
        setCookie('checkout_id', createdCheckout.id, {
          expires: date,
          secure: true,
        });
        setCheckout(createdCheckout.id);
      } else {
        const { checkout_id } = checkoutId;
        const res = await fetch('/api/existingCheckout', {
          method: 'POST',
          body: checkout_id,
        });
        const existingCheckout = await res.json();
        setCheckout(existingCheckout.id);
      }
    } catch (e) {}
  }, []);

  return (
    <>
      <ChakraProvider theme={theme}>
        <CookiesProvider>
          <CartProvider checkoutId={checkout}>
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
