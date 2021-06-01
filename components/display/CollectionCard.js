import Link from 'next/link';
import { LinkBox, LinkOverlay, Heading, Text, Image } from '@chakra-ui/react';

const CollectionCard = ({ collection }) => {
  return (
    <LinkBox
      aria-label='Visit Item in Collection'
      display='flex'
      flexDirection='column'
      maxWidth='20rem'
      boxShadow='md'
      _hover={{ boxShadow: 'lg' }}
      rounded='md'
      p={2}
    >
      <Image src={collection.image.src} alt={collection.title} rounded='md' />
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
