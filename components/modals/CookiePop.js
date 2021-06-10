import { useRef } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
} from '@chakra-ui/react';

const CookiePop = ({ isOpen, onClose }) => {
  const accept = useRef();
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement='bottom'
      initialFocusRef={accept}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody textAlign='center' p='1rem'>
          THIS WEBSITE USES COOKIES TO IMPROVE YOUR SHOPPING EXPERIENCE
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={onClose} ref={accept}>
            ACCEPT
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CookiePop;
