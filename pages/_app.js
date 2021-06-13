import { useEffect, useState } from 'react';
//global styles and styles for components
import GlobalStyles from '../style/GlobalStyles';
//Chakra UI
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
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
import CookiePop from '../components/modals/CookiePop';
import Footer from '../components/footer/Footer';

function MyApp({ Component, pageProps }) {
  const [checkout, setCheckout] = useState();
  const [cookies, setCookie] = useCookies(['checkoutId']);
  const [shouldPop, setShouldPop] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //retrieve existing checkout from cookies or create a new checkout
  useEffect(async () => {
    let checkoutId = cookies;
    let date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    try {
      if (Object.keys(checkoutId).length === 0) {
        const res = await fetch('/api/createCheckout');
        const createdCheckout = await res.json();
        setCookie('checkoutId', createdCheckout.id, {
          expires: date,
          secure: true,
        });
        setCheckout(createdCheckout.id);
      } else {
        setCheckout(checkoutId.checkoutId);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    let pop_status = localStorage.getItem('pop_status');
    if (!pop_status) {
      setShouldPop(true);
      localStorage.setItem('pop_status', 1);
      onOpen();
    }
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
            {shouldPop ? <CookiePop isOpen={isOpen} onClose={onClose} /> : null}
          </CartProvider>
        </CookiesProvider>
      </ChakraProvider>
      <GlobalStyles />
    </>
  );
}

export default MyApp;
