import React from 'react';
import styled from 'styled-components';
import pizzalogo from '../assets/images/logo-pizza.png';

const LogoStyles = styled.div`
  /* This value controls the entire size of the logo*/
  width: 20rem;
  height: 20rem;
  margin: 0;
  background: var(--grey) url(${pizzalogo});
  display: flex;
  .inner {
    flex: 1;
    background: transparent;
    display: grid;
    grid-template-rows: 1fr;
    align-content: center;
  }
`;

export default function Logo() {
  return (
    <LogoStyles className="logo">
      <div className="inner" />
    </LogoStyles>
  );
}
