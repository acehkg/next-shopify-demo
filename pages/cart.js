import { useState, useEffect } from 'react';
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

const CartImage = ({ src, alt, count, handleIncrease, handleDecrease }) => {
  return (
    <ImageWrapper>
      <Image src={src} alt={alt} />
      <Count>{count}</Count>
      <UpdateWrapper>
        <Button
          aria-label='Add One and Update Cart'
          onClick={handleIncrease}
          style={{
            padding: '.25rem',
            height: '1.5rem',
            width: '1.5rem',
            margin: '0',
          }}
        >
          <Increment>+</Increment>
        </Button>
        <Button
          aria-lable='Remove One and Update Cart'
          onClick={handleDecrease}
          style={{
            padding: '.25rem',
            height: '1.5rem',
            width: '1.5rem',
            margin: '0',
          }}
        >
          <Increment>-</Increment>
        </Button>
      </UpdateWrapper>
    </ImageWrapper>
  );
};

const Increment = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;
const UpdateWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  display: flex;
  justify-content: space-between;
`;
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

const CartItem = ({
  title,
  quantity,
  price,
  size,
  src,
  alt,
  id,
  variantId,
}) => {
  const { checkoutId, removeItemFromCart, updateItemInCart } = useCartContext();
  const [qty, setQty] = useState(quantity);

  useEffect(async () => {
    try {
      await updateItemInCart(id, variantId, qty, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error updating cart...');
      console.log(e);
    }
  }, [qty]);

  const handleClick = async () => {
    try {
      await removeItemFromCart(id, checkoutId);
      mutate([`/api/existingCheckout/`, checkoutId]);
    } catch (e) {
      console.log('Error Removing Item from Cart...');
      console.log(e);
    }
  };

  const handleIncrease = () => {
    setQty((qty) => qty + 1);
  };

  const handleDecrease = () => {
    setQty((qty) => qty - 1);
  };
  const subTotal = (price * quantity).toFixed(2);
  return (
    <ItemWrapper>
      <CartImage
        src={src}
        alt={alt}
        count={qty}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
      />
      <TextWrapper>
        <Title>{title}</Title>
        {size === 'Default Title' ? <div></div> : <Size>{size}</Size>}
        <SubTotal>${subTotal}</SubTotal>
      </TextWrapper>
      <Button
        icon
        compact
        size='tiny'
        style={{ margin: '0' }}
        onClick={handleClick}
        aria-label='Remove Item'
      >
        <Icon name='remove' size='small' style={{ lineHeight: '1.45' }} />
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
          variantId={item.variant.id}
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
