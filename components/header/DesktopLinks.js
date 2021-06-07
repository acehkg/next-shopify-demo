import { Flex, Spacer } from '@chakra-ui/react';
import MenuItem from '../header/MenuItem';
import CartWidget from '../cart/CartWidget';
import links from '../../utils/links.json';

const DesktopLinks = () => {
  return (
    <Flex
      as='nav'
      display={['none', 'none', 'none', 'flex']}
      w='60%'
      align='center'
      justify='flex-end'
    >
      <MenuItem href='/' mr='5%'>
        HOME
      </MenuItem>

      <MenuItem href='/collections' mr='5%'>
        COLLECTIONS
      </MenuItem>

      <MenuItem href='/products' mr='5%'>
        ALL PRODUCTS
      </MenuItem>

      {links.map((link) => {
        return (
          <MenuItem
            key={link.handle}
            href={`/collections/${link.handle}`}
            mr='5%'
          >
            {link.title.toUpperCase()}
          </MenuItem>
        );
      })}

      <MenuItem href='/cart'>
        <CartWidget />
      </MenuItem>
    </Flex>
  );
};

export default DesktopLinks;
