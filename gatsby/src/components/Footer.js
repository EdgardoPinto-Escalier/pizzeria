import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaBeer } from 'react-icons/fa';

const FooterStyles = styled.footer`
  padding-top: 3.5rem;
  margin-top: 3.5rem;
  .center {
    text-align: center;
  }
  @media (max-width: 700px) {
    padding-top: 2.5rem;
    margin-top: 2.5rem;
    border-top: 2px solid #eee;
  }

  .beer-icon {
    color: var(--red);
    vertical-align: middle;
    margin-bottom: 3px;
    margin-right: 5px;
  }

  span {
    color: var(--red);
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p className="center">&copy; Pizzeria {new Date().getFullYear()}</p>
      <p className="center">
        Check Our <FaBeer className="beer-icon" />
        <Link to="/beers">
          <span>Beers</span>
        </Link>
      </p>
    </FooterStyles>
  )
}
