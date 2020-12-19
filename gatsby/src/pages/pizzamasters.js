import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const PizzaMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
`;

const PizzaMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--red);
    padding: 1rem;
    color: var(--white);
    margin: 2rem;
    margin-top: -1rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function PizzaMastersPage({ data, pageContext }) {
  const pizzamasters = data.pizzamasters.nodes;
  return (
    <>
      <SEO title={`Pizza Masters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.pizzamasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/pizzamasters"
      />
      <PizzaMasterGrid>
        {pizzamasters.map((person) => (
          <PizzaMasterStyles>
            <Link to={`/pizzamaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </PizzaMasterStyles>
        ))}
      </PizzaMasterGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    pizzamasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
