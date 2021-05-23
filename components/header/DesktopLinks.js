import styled from 'styled-components';
import Link from 'next/link';
import CartWidget from '../cart/CartWidget';

const Wrapper = styled.nav`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  color: var(--link-color);

  a {
    &:not(:first-child) {
      padding-left: 5rem;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const DesktopLinks = () => {
  return (
    <Wrapper>
      <Link href='/'>
        <a>HOME</a>
      </Link>
      <Link href='/products'>
        <a>PRODUCTS</a>
      </Link>
      <Link href='/cart'>
        <a>
          <CartWidget />
        </a>
      </Link>
    </Wrapper>
  );
};

export default DesktopLinks;
