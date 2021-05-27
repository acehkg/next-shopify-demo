import styled from 'styled-components';
import Link from 'next/link';
import useNav from '../../hooks/useNav';
import links from '../../utils/links.json';

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
        <a onClick={handleNav}>ALL PRODUCTS</a>
      </Link>
      {links.map((link) => {
        return (
          <Link key={link.handle} href={`/collections/${link.handle}`}>
            <a onClick={handleNav}>{link.title.toUpperCase()}</a>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default MobileLinks;
