import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
} from '@chakra-ui/react';

const CookiePop = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement='bottom'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody textAlign='center' p='1rem'>
          THIS WEBSITE USES COOKIES TO IMPROVE YOUR SHOPPING EXPERIENCE
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CookiePop;
