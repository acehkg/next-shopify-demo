import { useEffect } from 'react';
import useNav from '../../hooks/useNav';
import styled from 'styled-components';
import Logo from './Logo';
import DesktopLinks from './DesktopLinks';
import Burger from '../header/Burger';
//cart
import useCart from '../../hooks/useCart';

const Head = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 8rem;
  background-color: var(--header-color);
  margin-bottom: 2rem;
`;
const Header = () => {
  const { open } = useNav();
  const { cart } = useCart();
  console.log(cart);
  let counter = 0;
  if (cart === 'undefined') {
    counter = 0;
  }
  if (cart == !'undefined') {
    counter = cart.lineItems.length;
  }
  console.log(counter);
  useEffect(() => {
    if (open === true) {
      document.body.style.overflow = 'hidden';
    }
    if (open !== true) {
      document.body.style.overflow = '';
    }
  }, [open]);
  return (
    <Head open={open}>
      <Logo image='/images/logo.jpg' alt='logo' />
      <Burger />
      <DesktopLinks />
      <Counter>{counter}</Counter>
    </Head>
  );
};
const Counter = styled.p`
  color: #fff;
`;
export default Header;
