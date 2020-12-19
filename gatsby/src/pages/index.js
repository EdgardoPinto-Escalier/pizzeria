import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentPizzaMasters({ pizzamasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Today's Pizza Masters</span>
      </h2>
      <p>Ready to make your Pizza!</p>
      {!pizzamasters && <LoadingGrid count={4} />}
      {pizzamasters && !pizzamasters?.length && (
        <p>No Pizza Masters working today...</p>
      )}
      {pizzamasters?.length && <ItemGrid items={pizzamasters} />}
    </div>
  );
}

function FeaturedPizzas({ hotpizzas }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Featured Pizzas</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotpizzas && <LoadingGrid count={4} />}
      {hotpizzas && !hotpizzas?.length && <p>No Featured Pizzas today...</p>}
      {hotpizzas?.length && <ItemGrid items={hotpizzas} />}
    </div>
  );
}

export default function HomePage() {
  const { pizzamasters, hotpizzas } = useLatestData();
  return (
    <div className="center">
      <h1>The best pizza in town!</h1>
      <p>Open every day from 10am to 10pm</p>
      <HomePageGrid>
        <CurrentPizzaMasters pizzamasters={pizzamasters} />
        <FeaturedPizzas hotpizzas={hotpizzas} />
      </HomePageGrid>
    </div>
  );
}
