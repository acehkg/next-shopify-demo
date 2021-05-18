import styled from 'styled-components';
import Link from 'next/link';
import useNav from '../../hooks/useNav';

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

  @media (max-width: 834px) {
    display: none;
  }
`;
const DesktopLinks = () => {
  const { links } = useNav();
  return (
    <Wrapper>
      <Link href='/'>
        <a>HOME</a>
      </Link>
      <Link href='/products'>
        <a>PRODUCTS</a>
      </Link>
    </Wrapper>
  );
};

export default DesktopLinks;
