import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import links from '../../utils/links.json';
import MenuLink from './MenuItem';
import { HiChevronDown } from 'react-icons/hi';

const CollectionsMenu = ({ bg, ...rest }) => {
  return (
    <Menu isLazy {...rest}>
      <MenuButton
        as={Button}
        rightIcon={<HiChevronDown />}
        bg={bg}
        _hover={{ bg: { bg } }}
        _active={{ bg: { bg } }}
        _focus={{ border: 'none' }}
      >
        <Text fontWeight='normal'>COLLECTIONS</Text>
      </MenuButton>
      <MenuList bg={bg}>
        {links.map((link) => {
          return (
            <MenuLink key={link.handle} href={`/collections/${link.handle}`}>
              <MenuItem>{link.title.toUpperCase()}</MenuItem>
            </MenuLink>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default CollectionsMenu;
