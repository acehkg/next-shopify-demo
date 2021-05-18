import styled from 'styled-components';
import MobileLinks from './MobileLinks';
import useNav from '../../hooks/useNav';

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: var(--slider-color);
  transition: 0.2s ease-in-out;
  right: ${(props) => (props.open ? '0' : '-100%')};
  //z-index: 1;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Slider = () => {
  const { open } = useNav();

  return (
    <Panel open={open}>
      <MobileLinks />
    </Panel>
  );
};

export default Slider;
