import { Box, Image } from '@chakra-ui/react';

const Logo = (props) => {
  return (
    <Box {...props}>
      <Image boxSize='100px' src='/images/logo.png' alt='Better Beer Co' />
    </Box>
  );
};
export default Logo;
