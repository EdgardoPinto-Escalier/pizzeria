import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { GiBeerBottle } from 'react-icons/gi';
import SEO from '../components/SEO';

const BeerStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 4rem;
`;

const SingleBeerStyles = styled.div`
  border: solid 1px #bfbfbf;
  padding: 2rem;
  text-align: center;
  h3 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
`;

export default function BeersPage({ data }) {
  return (
    <>
      <SEO title="Our Beers" />
      <h2 className="center">
        WE HAVE{' '}
        <span className="beers-available">{data.beers.nodes.length}</span> BEERS
        AVAILABLE!
      </h2>
      <BeerStyles>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <GiBeerBottle className="beer"/>
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
