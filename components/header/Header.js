import { useEffect } from 'react';
import useNav from '../../hooks/useNav';
import styled from 'styled-components';
import Logo from './Logo';
import DesktopLinks from './DesktopLinks';
import Burger from '../header/Burger';
// get cart data
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
  const { checkout } = useCart();
  const { open } = useNav();
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
      <Counter>0</Counter>
    </Head>
  );
};
const Counter = styled.p`
  color: #fff;
`;
export default Header;
