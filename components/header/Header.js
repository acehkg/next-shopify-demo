import { Flex, useDisclosure, IconButton } from '@chakra-ui/react';
import Logo from './Logo';
import DesktopLinks from './DesktopLinks';
import CartWidget from '../cart/CartWidget';
import MenuItem from '../header/MenuItem';
import MenuDrawer from '../header/MenuDrawer';
import { RiMenu4Line } from 'react-icons/ri';

const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex as='header' w='100%' align='center' justify='space-between' p={8}>
        <Logo image='/images/logo.png' alt='Better Beer Co' />

        <Flex align='center' d={['flex', 'flex', 'flex', 'none']}>
          <MenuItem href='/cart'>
            <CartWidget />
          </MenuItem>
          <IconButton
            aria-label='Open Nav Menu'
            onClick={onOpen}
            icon={<RiMenu4Line size={32} />}
            variant='outline'
            border='none'
          />
        </Flex>
        <DesktopLinks />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Header;
