import useCart from '../hooks/useCart';
import useCartContext from '../hooks/useCartContext';
import { Dimmer, Loader, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { mutate } from 'swr';

const Loading = () => {
  return (
    <LoadingWrapper>
      <Dimmer active>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  height: 100%;
`;

const CartImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} />;
};

const Image = styled.img`
  width: 6rem;
  height: auto;
`;

const CartItem = ({ title, quantity, size, src, alt, id }) => {
  const { checkoutId, removeItemFromCart } = useCartContext();
  const handleClick = async () => {
    try {
      await removeItemFromCart(id, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error Removing Item from Cart...');
      console.log(e);
    }
  };
  return (
    <ItemWrapper>
      <CartImage src={src} alt={alt} />
      <TextWrapper>
        <Title>{title}</Title>
        <Size>{size}</Size>
        <Qty>{quantity}</Qty>
      </TextWrapper>
      <Button
        icon
        compact
        size='tiny'
        style={{ margin: '0' }}
        onClick={handleClick}
      >
        <Icon name='remove' size='small' />
      </Button>
    </ItemWrapper>
  );
};
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.p`
  display: none;
  @media (min-width: 768px) {
    display: block;
    width: 8rem;
  }
`;
const Size = styled.p``;
const Qty = styled.p``;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  text-align: left;
`;

const Checkout = ({ total, currency, url }) => {
  return (
    <CheckoutWrapper>
      <Total>{`${total}${currency}`}</Total>
      <a href={url}>
        <Button>CHECKOUT</Button>
      </a>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.div``;
const Total = styled.p``;

const Cart = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);
  console.log(cartData);
  if (cartData.isLoading === true) {
    return <Loading />;
  }
  return (
    <>
      {cartData.checkout.lineItems.map((item) => (
        <CartItem
          key={item.variant.id}
          id={item.id}
          title={item.title}
          quantity={item.quantity}
          size={item.variant.title}
          src={item.variant.image.src}
          alt={item.title}
        />
      ))}
      <Checkout
        total={cartData.checkout.totalPriceV2.amount}
        currency={cartData.checkout.totalPriceV2.currencyCode}
        url={cartData.checkout.webUrl}
      />
    </>
  );
};

export default Cart;
