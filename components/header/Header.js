import dynamic from 'next/dynamic';
import { Flex, useDisclosure, IconButton } from '@chakra-ui/react';
import Logo from './Logo';
import DesktopLinks from './DesktopLinks';
//import CartWidget from '../cart/CartWidget';
import MenuItem from '../header/MenuItem';
import MenuDrawer from '../header/MenuDrawer';
import { RiMenu4Line } from 'react-icons/ri';
import DarkMode from '../interface/DarkMode';

const CartWidget = dynamic(() => import('../cart/CartWidget'), { ssr: false });
const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex
        as='header'
        w='100%'
        align='center'
        justify='space-between'
        height='20%'
        pl='5%'
        pr='5%'
      >
        <Logo image='/images/logo.png' alt='Better Beer Co' />

        <Flex align='center' d={['flex', 'flex', 'flex', 'none']}>
          <DarkMode mr='0.5rem' size='sm' />
          <MenuItem href='/cart'>
            <CartWidget />
          </MenuItem>
          <IconButton
            aria-label='Open Nav Menu'
            onClick={onOpen}
            icon={<RiMenu4Line size={32} />}
            variant='outline'
            border='none'
            ml='.5rem'
          />
        </Flex>
        <DesktopLinks />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Header;
