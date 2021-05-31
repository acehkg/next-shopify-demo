import { Flex } from '@chakra-ui/react';
import useNav from '../../hooks/useNav';
import links from '../../utils/links.json';
import MenuItem from '../header/MenuItem';

const MobileLinks = () => {
  const { open, setOpen } = useNav();

  const handleNav = () => {
    setOpen(!open);
  };

  return (
    <Flex
      as='nav'
      direction='column'
      justify='space-evenly'
      align='center'
      h='100%'
    >
      <MenuItem href={'/'} onClick={handleNav}>
        HOME
      </MenuItem>
      <MenuItem href={'/collections'} onClick={handleNav}>
        COLLECTIONS
      </MenuItem>
      {links.map((link) => {
        return (
          <MenuItem
            key={link.handle}
            href={`/collections/${link.handle}`}
            onClick={handleNav}
          >
            {link.title.toUpperCase()}
          </MenuItem>
        );
      })}
    </Flex>
  );
};

export default MobileLinks;
