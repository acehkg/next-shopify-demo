import { useEffect, useState } from 'react';
import GlobalStyles from '../style/GlobalStyles';
import Font from '../style/Font';
import 'semantic-ui-css/semantic.min.css';
//Context for navbar state on mobile
import NavOpenProvider from '../context/MenuContext';
//Cart Context
import CartProvider from '../context/CartContext';
//cookies provider
import { CookiesProvider, useCookies } from 'react-cookie';
//Layout Components
import Header from '../components/header/Header';
import Slider from '../components/header/Slider';

function MyApp({ Component, pageProps }) {
  const [checkout, setCheckout] = useState();
  const [cookies, setCookie] = useCookies(['checkoutId']);

  useEffect(async () => {
    let checkoutId = cookies;
    if (Object.keys(checkoutId).length === 0) {
      const createdCheckout = await fetch('/api/createCheckout');
      createdCheckout.json().then((body) => {
        setCookie('checkoutId', body.id);
        setCheckout(body.id);
      });
    } else {
      const existingCheckout = await fetch('/api/existingCheckout', {
        method: 'POST',
        body: checkoutId.checkoutId,
      });
      existingCheckout.json().then((body) => {
        setCheckout(body.id);
      });
    }
  }, []);
  return (
    <>
      <CookiesProvider>
        <CartProvider checkout={checkout}>
          <NavOpenProvider>
            <Slider />
            <Header />
            <Component {...pageProps} />
          </NavOpenProvider>
        </CartProvider>
      </CookiesProvider>
      <Font />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
