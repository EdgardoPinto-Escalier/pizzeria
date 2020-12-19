import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 1rem;
    align-items: center;
    text-align: center;
    list-style: none;
    margin-top: -6rem;
  }

  a.nav-link {
    font-size: 2.2rem;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    padding: 1rem;
    &:hover {
      color: var(--red);
    }
    &[aria-current='page'] {
      padding: 1rem;
      background-color: var(--red);
      color: var(--white);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Featured
          </Link>
        </li>
        <li>
          <Link to="/pizzas" className="nav-link">
            Pizza Menu
          </Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/pizzamasters" className="nav-link">
            Pizza Masters
          </Link>
        </li>
        <li>
          <Link to="/order" className="nav-link">
            Order Now!
          </Link>
        </li>
      </ul>
    </NavStyles>
  );
}
