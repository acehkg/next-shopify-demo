import useCart from '../../hooks/useCart';
import useCartContext from '../../hooks/useCartContext';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import Link from 'next/link';

const Waiting = () => {
  return <Zero>$0.00</Zero>;
};
const Zero = styled.p`
  color: #fff;
`;
const MobileCartDisplay = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);

  if (cartData.isLoading === true) {
    return <Waiting />;
  }

  const price = cartData.checkout.totalPriceV2.amount;
  const total = (price * 1).toFixed(2);

  return (
    <Link href='/cart'>
      <WidgetWrapper aria-label='Shopping Cart'>
        <Icon name='cart' color='red' size='small' />
        <Total>${total}</Total>
      </WidgetWrapper>
    </Link>
  );
};
const WidgetWrapper = styled.a`
  display: flex;
  align-items: center;

  cursor: pointer;
  @media (min-width: 769px) {
    display: none;
  }
`;

const Total = styled.p`
  padding-top: 0.4rem;
  font-size: 0.75rem;
  color: #fff;
`;

export default MobileCartDisplay;
