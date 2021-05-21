import styled from 'styled-components';
import Link from 'next/link';
import useNav from '../../hooks/useNav';

const Wrapper = styled.nav`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: var(--link-color);
`;
const MobileLinks = () => {
  const { open, setOpen } = useNav();

  const handleNav = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <Link href={'/'}>
        <a onClick={handleNav}>HOME</a>
      </Link>
      <Link href={'/products'}>
        <a onClick={handleNav}>PRODUCTS</a>
      </Link>
      <Link href={'/cart'}>
        <a onClick={handleNav}>CART</a>
      </Link>
    </Wrapper>
  );
};

export default MobileLinks;
