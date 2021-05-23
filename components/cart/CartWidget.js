import useCart from '../../hooks/useCart';
import useCartContext from '../../hooks/useCartContext';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Waiting = () => {
  return <Zero>$0.00</Zero>;
};
const Zero = styled.p`
  color: #fff;
`;
const CartWidget = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);
  console.log(cartData);

  if (cartData.isLoading === true) {
    return <Waiting />;
  }

  const price = cartData.checkout.totalPriceV2.amount;
  const total = (price * 1).toFixed(2);
  return (
    <WidgetWrapper>
      <Icon name='cart' color='red' size='large' />
      <Total>${total}</Total>
    </WidgetWrapper>
  );
};
const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  justify-content: space-evenly;
`;
const Total = styled.p`
  color: #fff;
`;

export default CartWidget;
