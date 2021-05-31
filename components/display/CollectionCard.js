import styled from 'styled-components';
import Link from 'next/link';
import { LinkBox, LinkOverlay, Heading, Text, Image } from '@chakra-ui/react';

const CollectionCard = ({ collection }) => {
  return (
    <LinkBox
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

const Wrapper = styled.a`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  @media (min-width: 375px) {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  @media (min-width: 1024px) {
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;
export default CollectionCard;
