import { createGlobalStyle } from 'styled-components';

import font from '../assets/fonts/frenchfries.woff';

const Typography = createGlobalStyle`
  @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
  html {
    font-family: 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--black);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
  }
  mark, .mark {
    font-size: 2.2rem;
    font-weight: bold;
    background: var(--red);
    color: var(--white);
    text-transform: uppercase;
    padding: .8rem;
    margin: 0;
    display: inline;
    line-height: 1;
  }

    mark, .mark-small {
    font-size: 1.8rem;
    font-weight: bold;
    background: var(--red);
    color: var(--white);
    text-transform: uppercase;
    padding: .2rem;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
  }

  .tilt {
    transform: rotate(-2deg);
  }
`;

export default Typography;
