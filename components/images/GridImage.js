import styled from 'styled-components';

const GridImage = ({ src, alt }) => {
  return (
    <div>
      <CustomImage src={src} alt={alt} />
    </div>
  );
};
const CustomImage = styled.img`
  width: 100%;
  height: auto;
`;
export default GridImage;
