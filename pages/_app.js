import { useEffect, useState } from 'react';
import GlobalStyles from '../style/GlobalStyles';
import Font from '../style/Font';
import 'semantic-ui-css/semantic.min.css';
//Context for navbar state on mobile
import NavOpenProvider from '../context/MenuContext';
//Cart Context
import CartProvider from '../context/CartContext';
//useSWR for cart data fetching
import useCart from '../hooks/useCart';
//cookies provider
import { CookiesProvider, useCookies } from 'react-cookie';
//Layout Components
import Header from '../components/header/Header';
import Slider from '../components/header/Slider';

function MyApp({ Component, pageProps }) {
  const [checkout, setCheckout] = useState();
  const [cookies, setCookie] = useCookies(['checkoutId']);

  //retrieve existing checkout from cookies or create a new checkout
  useEffect(async () => {
    let checkoutId = cookies;
    try {
      if (Object.keys(checkoutId).length === 0) {
        const res = await fetch('/api/createCheckout');
        const createdCheckout = await res.json();
        setCookie('checkoutId', createdCheckout.id);
        setCheckout(createdCheckout.id);
      } else {
        const res = await fetch('/api/existingCheckout', {
          method: 'POST',
          body: checkoutId.checkoutId,
        });
        const existingCheckout = await res.json();
        setCheckout(existingCheckout.id);
      }
    } catch (e) {
      console.log('Error!');
      console.log(e);
    }
  }, []);
  //fetch cart data using SWR on app loading
  useCart(checkout);
  return (
    <>
      <CookiesProvider>
        <CartProvider checkoutId={checkout}>
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
