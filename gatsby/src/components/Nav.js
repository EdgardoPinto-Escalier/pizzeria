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
    display: block;
    &:hover {
      color: var(--red);
    }
    &[aria-current='page'] {
      padding: 1rem;
      background-color: var(--red);
      color: var(--white);
    }
    @media (max-width: 800px) {
      font-size: 1.8rem;
    }
  }
  @media (max-width: 700px) {
    --columns: 4;
    margin-bottom: 4rem;
    border-bottom: 2px solid #eee;
    ul {
      padding-top: 1rem;
      margin-top: 1rem;
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
    }
    .main-logo {
      display: none;
    }
    .logo {
      transform: none;
    }
  }
  @media (max-width: 500px) {
    --columns: 2;
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
        <li className="main-logo">
          <Link to="/">
            <Logo className="main-logo" />
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
