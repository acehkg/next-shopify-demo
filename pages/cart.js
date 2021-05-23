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

const CartImage = ({ src, alt, count }) => {
  return (
    <ImageWrapper>
      <Image src={src} alt={alt} />
      <Count>{count}</Count>
    </ImageWrapper>
  );
};
const ImageWrapper = styled.div`
  position: relative;
`;

const Count = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5rem;
  width: 1.5rem;
  background: lightgrey;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
`;

const Image = styled.img`
  width: 8rem;
  height: auto;
`;

const CartItem = ({ title, quantity, price, currency, size, src, alt, id }) => {
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
  const subTotal = (price * quantity).toFixed(2);
  return (
    <ItemWrapper>
      <CartImage src={src} alt={alt} count={quantity} />
      <TextWrapper>
        <Title>{title}</Title>
        <Size>{size}</Size>
        <SubTotal>${subTotal}</SubTotal>
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
const SubTotal = styled.p``;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  text-align: left;
`;

const Checkout = ({ total, currency, url }) => {
  const price = (total * 1).toFixed(2);
  return (
    <CheckoutWrapper>
      <Total>${`${price}${currency}`}</Total>
      <a href={url}>
        <Button>CHECKOUT</Button>
      </a>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.div`
  text-align: center;
`;
const Total = styled.p`
  padding: 1rem;
`;

const Cart = () => {
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);
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
          price={item.variant.priceV2.amount}
          currency={item.variant.priceV2.currencyCode}
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
