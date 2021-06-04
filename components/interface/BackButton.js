import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { RiArrowGoBackFill } from 'react-icons/ri';

const BackButton = ({ size, color }) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Button
      size={size}
      color={color}
      variant='link'
      leftIcon={<RiArrowGoBackFill color={color} />}
      onClick={handleClick}
    >
      BACK
    </Button>
  );
};

export default BackButton;
