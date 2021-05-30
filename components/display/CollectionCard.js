import styled from 'styled-components';
import Link from 'next/link';

const CardImage = ({ src, alt }) => {
  return <Image src={src} alt={alt} />;
};
const Image = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = ({ title, description }) => {
  return (
    <ContentWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  text-align: center;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  padding: 1rem;
`;

const Description = styled.p`
  padding: 1rem;
`;
const CollectionCard = ({ collection }) => {
  return (
    <Link href={`/collections/${collection.handle}`}>
      <Wrapper>
        <CardImage src={collection.image.src} alt={collection.title} />
        <CardContent
          title={collection.title}
          description={collection.description}
        />
      </Wrapper>
    </Link>
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
