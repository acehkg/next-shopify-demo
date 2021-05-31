import { useEffect } from 'react';
import useNav from '../../hooks/useNav';
import { Flex } from '@chakra-ui/react';
import Logo from './Logo';
import DesktopLinks from './DesktopLinks';
import Burger from '../header/Burger';
import CartWidget from '../cart/CartWidget';
import MenuItem from '../header/MenuItem';

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
    <Flex
      as='header'
      w='100%'
      align='center'
      justify='space-between'
      p={8}
      open={open}
    >
      <Logo image='/images/logo.png' alt='Better Beer Co' />
      <Flex
        direction={['column', 'column', 'row']}
        align='center'
        style={{ gap: '.5rem' }}
        d={['flex', 'flex', 'flex', 'none']}
      >
        <Burger />
        <MenuItem href='/cart'>
          <CartWidget />
        </MenuItem>
      </Flex>
      <DesktopLinks />
    </Flex>
  );
};

export default Header;
