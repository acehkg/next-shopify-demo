import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const Breadcrumb = () => {
  const { asPath } = useRouter();
  const pathnames = asPath.split('/').filter((x) => x);

  return (
    <BreadcrumbWrapper>
      <Link href='/'>
        <a>HOME</a>
      </Link>
      <span>></span>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <p>{name.toUpperCase()}</p>
        ) : (
          <>
            <Link href={routeTo}>
              <a>{name.toUpperCase()}</a>
            </Link>
            <span>></span>
          </>
        );
      })}
    </BreadcrumbWrapper>
  );
};
const BreadcrumbWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
`;
export default Breadcrumb;
