import {
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import usePolicies from '../../hooks/usePolicies';

const PoliciesMenu = ({ policies, size, ...rest }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const newPolicies = usePolicies(policies);
  return (
    <Menu isLazy placement='top' {...rest}>
      <MenuButton
        as={Button}
        rightIcon={<HiPlus size={size} />}
        bg={bg}
        _hover={{ bg: { bg } }}
        _active={{ bg: { bg } }}
        _focus={{ border: 'none' }}
      >
        STORE POLICIES
      </MenuButton>
      <MenuList>
        {newPolicies.map((policy) => {
          return (
            <MenuItem key={policy.id}>
              <Link href={policy.url}>{policy.title}</Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default PoliciesMenu;
