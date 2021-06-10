import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { RiArrowGoBackFill } from 'react-icons/ri';

const BackButton = ({ ...rest }) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Button
      {...rest}
      variant='link'
      leftIcon={<RiArrowGoBackFill />}
      onClick={handleClick}
    >
      BACK
    </Button>
  );
};

export default BackButton;
