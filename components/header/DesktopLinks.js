import { Flex } from '@chakra-ui/react';
import MenuItem from '../header/MenuItem';
import CartWidget from '../cart/CartWidget';
import links from '../../utils/links.json';

const DesktopLinks = () => {
  return (
    <Flex
      as='nav'
      display={['none', 'none', 'none', 'flex']}
      w='70%'
      align='center'
      justify='flex-end'
      style={{ gap: '3rem' }}
    >
      <MenuItem href='/'>HOME</MenuItem>
      <MenuItem href='/products'>ALL PRODUCTS</MenuItem>
      {links.map((link) => {
        return (
          <MenuItem key={link.handle} href={`/collections/${link.handle}`}>
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
