import Link from 'next/link';
import { Box, Image } from '@chakra-ui/react';

const Logo = (props) => {
  return (
    <Link href='/'>
      <Box {...props}>
        <Image
          boxSize='100px'
          src='/images/logo.png'
          alt='Better Beer Co'
          htmlHeight='200px'
          htmlWidth='200px'
        />
      </Box>
    </Link>
  );
};
export default Logo;
