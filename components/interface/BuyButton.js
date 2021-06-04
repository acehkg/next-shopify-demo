//chakra ui
import { Button, VisuallyHidden } from '@chakra-ui/react';
//icons
import { FaCartPlus } from 'react-icons/fa';
//components

const BuyButton = ({
  totalPrice,
  currencyCode,
  handleClick,
  quantity,
  title,
  marginY,
}) => {
  return (
    <Button
      rightIcon={<FaCartPlus />}
      mt={marginY}
      mb={marginY}
      minWidth={['50%', '50%', '100%', '80%']}
      onClick={handleClick}
    >
      <VisuallyHidden>
        Add {quantity}
        {title} to your cart
      </VisuallyHidden>
      ${totalPrice}
      {currencyCode}
    </Button>
  );
};

export default BuyButton;
