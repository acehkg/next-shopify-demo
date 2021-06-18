import { Flex, useColorModeValue } from '@chakra-ui/react';
import MenuItem from '../header/MenuItem';
import CollectionsMenu from './CollectionsMenu';

const MobileLinks = () => {
  const bg = useColorModeValue('white', 'gray.700');
  return (
    <Flex
      as='nav'
      direction='column'
      justify='space-evenly'
      align='center'
      h='100%'
    >
      <MenuItem href={'/'}>HOME</MenuItem>
      <CollectionsMenu bg={bg} placement='bottom' />
      <MenuItem href={'/products'}>ALL PRODUCTS</MenuItem>
    </Flex>
  );
};

export default MobileLinks;
