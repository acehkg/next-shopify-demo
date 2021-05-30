import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Breadcrumb = () => {
  const { asPath } = useRouter();
  const pathnames = asPath.split('/').filter((x) => x);

  return (
    <BreadcrumbWrapper>
      <Link href='/'>
        <a>HOME</a>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <>
            <Icon name='angle right' />
            <p>{name.toUpperCase()}</p>
          </>
        ) : (
          <>
            <Icon name='angle right' />
            <Link href={routeTo}>
              <a>{name.toUpperCase()}</a>
            </Link>
          </>
        );
      })}
    </BreadcrumbWrapper>
  );
};
const BreadcrumbWrapper = styled.nav`
  display: flex;
  width: 80%;
  margin: 0 auto;
  gap: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
`;
export default Breadcrumb;
