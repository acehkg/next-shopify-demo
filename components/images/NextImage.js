import Image from 'next/image';
import styled from 'styled-components';

const Wrapper = styled.div`
  img {
    border-radius: ${(props) => props.rounding};
  }
`;

const NextImage = ({ src, alt, rounding, ...rest }) => {
  return (
    <Wrapper rounding={rounding}>
      <Image src={src} alt={alt} {...rest} />
    </Wrapper>
  );
};

export default NextImage;
