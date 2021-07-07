import Link from 'next/link';
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from '../images/NextImage';

const CollectionCard = ({ collection }) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  return (
    <LinkBox
      aria-label='Visit Item in Collection'
      display='flex'
      flexDirection='column'
      minWidth='17rem'
      p='1rem'
      bg={bg}
      rounded='md'
      cursor='pointer'
    >
      <NextImage
        src={
          collection.image === null
            ? '/images/comingsoon.jpg'
            : `${collection.image.originalSrc}`
        }
        alt={collection.title}
        rounding='var(--chakra-radii-md)'
        height={512}
        width={768}
        layout='responsive'
        quality={50}
      />
      <Link href={`/collections/${collection.handle}`}>
        <Heading as='h2' size='md' pt={4} pb={4} textAlign='center'>
          <LinkOverlay>{collection.title.toUpperCase()}</LinkOverlay>
        </Heading>
      </Link>
      <Text textAlign='center'>{collection.description}</Text>
    </LinkBox>
  );
};

export default CollectionCard;
