import { useEffect } from 'react';
import GlobalStyles from '../style/GlobalStyles';
import Font from '../style/Font';
import 'semantic-ui-css/semantic.min.css';
//Context for navbar state on mobile
import NavOpenProvider from '../context/MenuContext';
//Cart Context
import CartProvider from '../context/CartContext';
import useCart from '../hooks/useCart';
//cookies provider
import { CookiesProvider } from 'react-cookie';
//Layout Components
import Header from '../components/header/Header';
import Slider from '../components/header/Slider';

const CartWrapper = ({ children }) => {
  const { createCheckout, cart } = useCart();
  useEffect(() => {
    createCheckout();
  }, []);
  console.log(cart);
  return <CookiesProvider>{children}</CookiesProvider>;
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <CartWrapper>
          <NavOpenProvider>
            <Slider />
            <Header />
            <Component {...pageProps} />
          </NavOpenProvider>
        </CartWrapper>
      </CartProvider>

      <Font />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
