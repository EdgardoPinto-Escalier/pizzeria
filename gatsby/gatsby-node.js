import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function pizzaPage({ graphql, actions }) {
  // Get the template for this pizza page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function toppingPage({ graphql, actions }) {
  // Get the template for the topping page.
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}

export async function fetchBeers({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // Fetch a list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // Loop over each beer.
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function pizzamasterPages({ graphql, actions }) {
  // Query all pizza masters.
  const { data } = await graphql(`
    query {
      pizzamasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // Turn each pizza master into a page.
  data.pizzamasters.nodes.forEach((pizzamaster) => {
    actions.createPage({
      component: path.resolve('./src/templates/Pizzamaster.js'),
      path: `/pizzamaster/${pizzamaster.slug.current}`,
      context: {
        name: pizzamaster.person,
        slug: pizzamaster.slug.current,
      },
    });
  });
  // Find out how many pages exist based on how many pizza masters we have and how many per page.
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.pizzamasters.totalCount / pageSize);

  // Loop them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/pizzamasters/${i + 1}`,
      component: path.resolve('./src/pages/pizzamasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // Fetch list of beers and source them into the Gtasby API.
  await Promise.all([fetchBeers(params)]);
}

export async function createPages(params) {
  // Create pages dinamically.
  // Wait for all promises to be resolved before finishing this function.
  await Promise.all([
    pizzaPage(params),
    toppingPage(params),
    pizzamasterPages(params),
  ]);
}
