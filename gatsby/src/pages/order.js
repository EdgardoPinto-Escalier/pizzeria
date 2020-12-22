import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  MdPersonPin,
  MdLocalPizza,
  MdShoppingBasket,
  MdShoppingCart,
} from 'react-icons/md';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateTotalOrder from '../utils/calculateTotalOrder';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    nypon: '',
  });
  const {
    order,
    addPizzaToOrder,
    removePizzaFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order Now!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>
            <MdPersonPin className="order-icon" /> Your Info
          </legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
          <input
            type="nypon"
            name="nypon"
            id="nypon"
            value={values.nypon}
            onChange={updateValue}
            className="nypon"
          />
        </fieldset>
        <fieldset disabled={loading} className="menu">
          <legend>
            <MdLocalPizza className="order-icon" /> Menu
          </legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
                className="pizza-order"
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addPizzaToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={loading} className="order">
          <legend>
            <MdShoppingBasket className="order-icon" /> Order
          </legend>
          <PizzaOrder
            order={order}
            removePizzaFromOrder={removePizzaFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3 className="total">
            Your Total is:{' '}
            <span className="total-span">
              {formatMoney(calculateTotalOrder(order, pizzas))}
            </span>
          </h3>
          <div aria-live="polite" aria-atomic="true">
            {error ? <p>Error: {error}</p> : ''}
          </div>
          <button type="submit" disabled={loading} className="back-button">
            <span aria-live="assertive" aria-atomic="true">
              {loading ? 'Placing Order...' : ''}
            </span>
            <MdShoppingCart className="order-icon shop" />{' '}
            {loading ? '' : 'Order Now!'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  )
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
