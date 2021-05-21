import { useEffect } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../config/configuration';
import useNav from '../../hooks/useNav';

const StyledBurger = styled.div`
  //position: absolute;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  width: 2rem;
  height: 2rem;
  //right: 2rem;
  //top: 4rem;
  z-index: 2;
  @media (min-width: 834px) {
    display: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: var(--burger-color);
    border-radius: 10px;
    transform-origin: 1px;
    transition: ${({ open }) =>
      open ? 'transform 0.1s linear' : 'transform 0.1s linear'};

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      visibility: ${({ open }) => (open ? 'hidden' : 'revert')};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = () => {
  const { open, setOpen } = useNav();

  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
