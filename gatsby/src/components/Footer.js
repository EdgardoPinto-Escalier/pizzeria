import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  .center {
    text-align: center;
  }
  @media (max-width: 700px) {
    padding-top: 2.5rem;
    margin-top: 2.5rem;
    border-top: 2px solid #eee;
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p className="center">&copy; Pizzeria {new Date().getFullYear()}</p>
      <p className="center">Check Our Beers</p>
    </FooterStyles>
  );
}
