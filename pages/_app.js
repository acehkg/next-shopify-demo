import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//global styles and styles for components
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
import Breadcumb from '../components/Breadcrumb';
import Slider from '../components/header/Slider';

function MyApp({ Component, pageProps }) {
  const [checkout, setCheckout] = useState();
  const [cookies, setCookie] = useCookies(['checkoutId']);

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
        const res = await fetch('/api/existingCheckout', {
          method: 'POST',
          body: checkoutId.checkoutId,
        });
        const existingCheckout = await res.json();
        setCheckout(existingCheckout.id);
      }
    } catch (e) {
      console.log('Error creating or restrieving checkout!');
      console.log(e);
    }
  }, []);

  return (
    <>
      <CookiesProvider>
        <CartProvider checkoutId={checkout}>
          <NavOpenProvider>
            <Slider />
            <Header />
            <Breadcumb />
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
