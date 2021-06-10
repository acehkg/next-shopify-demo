import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Router } from 'next/router';

const GoShopping = ({ isOpen, onClose }) => {
  const handleClick = () => {
    onClose();
    Router.push('/collections');
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
          <ModalBody>YOUR CART IS EMPTY</ModalBody>
          <ModalFooter>
            <Button onClick={handleClick}>GO SHOPPING</Button>
          </ModalFooter>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default GoShopping;
