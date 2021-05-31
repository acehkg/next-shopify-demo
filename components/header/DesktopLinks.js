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
      <MenuItem href='/'>HOME</MenuItem>
      <Spacer />
      <MenuItem href='/collections'>COLLECTIONS</MenuItem>
      <Spacer />
      {links.map((link) => {
        return (
          <>
            <MenuItem key={link.handle} href={`/collections/${link.handle}`}>
              {link.title.toUpperCase()}
            </MenuItem>
            <Spacer />
          </>
        );
      })}
      <MenuItem href='/cart'>
        <CartWidget />
      </MenuItem>
    </Flex>
  );
};

export default DesktopLinks;
