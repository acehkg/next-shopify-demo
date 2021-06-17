import Link from 'next/link';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const Logo = ({ src, alt, ...rest }) => {
  return (
    <Link href='/'>
      <Box {...rest}>
        <Image
          src={src}
          alt={alt}
          height={200}
          width={200}
          layout='responsive'
        />
      </Box>
    </Link>
  );
};
export default Logo;
