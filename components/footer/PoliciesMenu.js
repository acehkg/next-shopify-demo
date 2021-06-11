import {
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import usePolicies from '../../hooks/usePolicies';

const PoliciesMenu = ({ policies, size, ...rest }) => {
  const newPolicies = usePolicies(policies);
  return (
    <Menu isLazy placement='top'>
      <MenuButton as={Button} rightIcon={<HiPlus size={size} />} {...rest}>
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
