import styled from 'styled-components';

const Wrapper = styled.div`
  img {
    width: 100px;
    height: auto;
  }
`;
const Logo = ({ image, alt }) => {
  return (
    <Wrapper>
      <img src={image} alt={alt} />
    </Wrapper>
  );
};
export default Logo;
