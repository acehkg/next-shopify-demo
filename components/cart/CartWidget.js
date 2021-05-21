import useCart from '../../hooks/useCart';
import useCartContext from '../../hooks/useCartContext';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const CartWidget = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);
  console.log(cartData);

  if (cartData.isLoading === true) {
    return <Icon name='wait' color='red' />;
  }
  const price = cartData.checkout.totalPriceV2.amount;
  const total = (price * 1).toFixed(2);
  return (
    <WidgetWrapper>
      <Icon name='cart' color='red' />
      <Total>${total}</Total>
    </WidgetWrapper>
  );
};
const WidgetWrapper = styled.div``;
const Total = styled.p`
  color: #fff;
`;

export default CartWidget;
