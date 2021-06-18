import { useRouter } from 'next/router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = () => {
  const { asPath } = useRouter();
  const pathnames = asPath.split('/').filter((x) => x);

  return (
    <Breadcrumb
      p={8}
      pl='5%'
      spacing='8px'
      separator={<FaChevronRight />}
      fontSize='sm'
    >
      <BreadcrumbItem>
        <Link href='/'>
          <BreadcrumbLink>HOME</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <BreadcrumbItem key={name}>
            <Text fontSize='sm'>{name.toUpperCase()}</Text>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={name}>
            <Link href={routeTo}>
              <BreadcrumbLink>{name.toUpperCase()}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
