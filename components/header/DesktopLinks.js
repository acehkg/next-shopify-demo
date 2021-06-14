import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import MenuItem from '../header/MenuItem';
import CartWidget from '../cart/CartWidget';
import links from '../../utils/links.json';
import DarkMode from '../interface/DarkMode';
import CollectionsMenu from './CollectionsMenu';

const DesktopLinks = () => {
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <Flex
      as='nav'
      display={['none', 'none', 'none', 'flex']}
      w='100%'
      align='center'
      justify='flex-end'
    >
      <MenuItem href='/' mr='5%'>
        HOME
      </MenuItem>
      <Box mr='5%'>
        <CollectionsMenu bg={bg} />
      </Box>

      <MenuItem href='/products' mr='5%'>
        ALL PRODUCTS
      </MenuItem>
      <MenuItem href='/cart' mr='2%'>
        <CartWidget />
      </MenuItem>
      <DarkMode variant='outline' border='none' />
    </Flex>
  );
};

export default DesktopLinks;
