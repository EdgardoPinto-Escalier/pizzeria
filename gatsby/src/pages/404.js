import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const FourOFourStyles = styled.div`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  margin-bottom: 7rem;
  p {
    text-align: center;
  }

  .status {
    font-weight: bold;
    font-size: 5rem;
  }
  button {
    width: 100%;
    text-align: center;
  }
`;

export default function FourOFourPage() {
  return (
    <FourOFourStyles>
      <p className="status">404</p>
      <p>Ouch! That page doesn't exist...</p>
      <button Link to="/" type="button">
        BACK HOME
      </button>
    </FourOFourStyles>
  );
}
