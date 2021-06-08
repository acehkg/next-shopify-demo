import { Flex } from '@chakra-ui/react';
import links from '../../utils/links.json';
import MenuItem from '../header/MenuItem';

const MobileLinks = () => {
  return (
    <Flex
      as='nav'
      direction='column'
      justify='space-evenly'
      align='center'
      h='100%'
    >
      <MenuItem href={'/'}>HOME</MenuItem>
      <MenuItem href={'/collections'}>COLLECTIONS</MenuItem>
      <MenuItem href={'/products'}>ALL PRODUCTS</MenuItem>
      {links.map((link) => {
        return (
          <MenuItem key={link.handle} href={`/collections/${link.handle}`}>
            {link.title.toUpperCase()}
          </MenuItem>
        );
      })}
    </Flex>
  );
};

export default MobileLinks;
