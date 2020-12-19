import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

const SiteBordersStyles = styled.div`
  max-width: 1100px;
  margin: 12rem auto 4rem auto;
  background: black;
  background-size: 1500px;
  padding: 7px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBordersStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBordersStyles>
    </>
  );
}
