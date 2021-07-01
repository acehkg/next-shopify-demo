import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

const MenuItem = ({ children, href, ...rest }) => {
  return (
    <Link href={href}>
      <ChakraLink
        style={{ textDecoration: 'none' }}
        _hover={{ transform: 'scale(1.1)', transition: '0.1s all ease-in-out' }}
        {...rest}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default MenuItem;
