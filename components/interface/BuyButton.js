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
  stock,
  ...rest
}) => {
  if (stock === false) {
    return (
      <Button isDisabled minWidth={['50%', '50%', '50%', '80%']} {...rest}>
        <VisuallyHidden>OUT OF STOCK</VisuallyHidden>
        OUT OF STOCK
      </Button>
    );
  }

  return (
    <Button
      rightIcon={<FaCartPlus />}
      minWidth={['50%', '50%', '50%', '80%']}
      onClick={handleClick}
      {...rest}
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
