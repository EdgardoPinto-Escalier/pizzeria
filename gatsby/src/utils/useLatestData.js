import { useState, useEffect } from 'react';

const gql = String.raw;
const details = `
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  // Featured Pizzas
  const [hotpizzas, setHotPizzas] = useState();
  // Current Pizza Masters
  const [pizzamasters, setPizzaMasters] = useState();
  // Use side effect to fetch the data from graphql
  useEffect(function () {
    console.log('FETCHING DATA');
    // When the component loads fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              pizzamasters {
                ${details}
              }
              hotpizzas {
                ${details}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Check for errors

        // Set the data to state
        setPizzaMasters(res.data.StoreSettings.pizzamasters);
        setHotPizzas(res.data.StoreSettings.hotpizzas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return {
    pizzamasters,
    hotpizzas,
  };
}
