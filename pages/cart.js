import { useRouter } from 'next/router';
import useCart from '../hooks/useCart';
import useCartContext from '../hooks/useCartContext';
//chakra ui
import { Box, Flex, Spinner } from '@chakra-ui/react';
//components

import BackButton from '../components/interface/BackButton';
import CartItem from '../components/cart/CartItem';
import Checkout from '../components/cart/Checkout';
import PageSeo from '../components/seo/PageSeo';

const Loading = () => {
  return (
    <Flex pt={'10rem'} justify='center' align='center'>
      <Spinner size='xl' />
    </Flex>
  );
};

const Cart = () => {
  const { asPath } = useRouter();
  const metadata = {
    pageTitle: 'Shopping Cart',
    description: 'Your Shopping Cart',
    currentURL: `https://next-shopify-demo-three.vercel.app${asPath}`,
    previewImage: '/images/logo.png',
    siteName: 'NEXT JS and Shopify Demo',
  };
  const { checkoutId } = useCartContext();
  const cartData = useCart(checkoutId);

  if (cartData.isLoading === true) {
    return <Loading />;
  }

  return (
    <>
      <PageSeo metadata={metadata} />
      <Box as='main' minHeight='65%' pb='2rem'>
        <Box width='100px' marginLeft='auto' marginRight='auto'>
          <BackButton size='lg' color='current' mb='2rem' />
        </Box>
        <Flex direction='column' align='center'>
          {cartData.checkout.lineItems.map((item) => (
            <CartItem
              key={item.variant.id}
              id={item.id}
              title={item.title}
              qty={item.quantity}
              price={item.variant.price}
              currency={item.variant.priceV2.currencyCode}
              size={item.variant.title}
              src={item.variant.image.src}
              alt={item.title}
              variantId={item.variant.id}
              variant={item.variant.title}
            />
          ))}
          <Checkout
            total={cartData.checkout.totalPriceV2.amount}
            currency={cartData.checkout.totalPriceV2.currencyCode}
            url={cartData.checkout.webUrl}
          />
        </Flex>
      </Box>
    </>
  );
};

export default Cart;
