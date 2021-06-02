import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  width: 100%;
  height: 100%;
  justify-items: center;
`;

const GridContainer = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default GridContainer;
