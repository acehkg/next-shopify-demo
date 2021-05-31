import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

const MenuItem = ({ children, href, ...rest }) => {
  return (
    <Link href={href}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </Link>
  );
};

export default MenuItem;
