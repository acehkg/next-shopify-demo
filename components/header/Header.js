import { useEffect } from 'react';
import useNav from '../../hooks/useNav';
import styled from 'styled-components';
import Logo from './Logo';
import DesktopLinks from './DesktopLinks';
import Burger from '../header/Burger';
import MobileCartDisplay from '../cart/MobileCartDIsplay';

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
      <BurgerWrapper>
        <MobileCartDisplay />
        <Burger />
      </BurgerWrapper>
      <DesktopLinks />
    </Head>
  );
};
const BurgerWrapper = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
`;
export default Header;
