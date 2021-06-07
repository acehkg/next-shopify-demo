import Link from 'next/link';
import { GridItem } from '@chakra-ui/react';

const GridLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <GridItem as='a' cursor='pointer' {...rest}>
        {children}
      </GridItem>
    </Link>
  );
};

export default GridLink;
