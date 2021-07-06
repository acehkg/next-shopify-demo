import { Flex, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import FbButton from '../interface/FbButton';
import InstaButton from '../interface/InstaButton';
import TwButton from '../interface/TwButton';
import PoliciesMenu from './PoliciesMenu';
import DarkMode from '../interface/DarkMode';
//policies generated in pre-build script
import policies from '../../utils/policies.json';

const Footer = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('black', 'white');

  return (
    <Flex
      as='footer'
      width='100%'
      align='center'
      justify='space-evenly'
      height='15%'
      border='none'
      borderTop='solid'
      borderColor={borderColor}
      borderWidth='1px'
    >
      <ButtonGroup aria-label='Social Media Links' isAttached>
        <InstaButton url='https://www.instagram.com' size='24' bg={bg} />
        <FbButton url='https://www.facebook.com' size='24' bg={bg} />
        <TwButton url='https://www.twitter.com' size='24' bg={bg} />
      </ButtonGroup>
      <PoliciesMenu
        aria-label='Store Policies'
        policies={policies}
        size='24'
        bg={bg}
      />
      <DarkMode variant='outline' border='none' />
    </Flex>
  );
};

export default Footer;
