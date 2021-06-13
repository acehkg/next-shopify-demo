import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import DarkMode from '../interface/DarkMode';
import MobileLinks from '../header/MobileLinks';

const MenuDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      closeOnOverlayClick={true}
      size={['xs']}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex>
          <DrawerCloseButton />
          <DarkMode mt={2} ml={2} />
        </Flex>

        <DrawerBody>
          <MobileLinks />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
