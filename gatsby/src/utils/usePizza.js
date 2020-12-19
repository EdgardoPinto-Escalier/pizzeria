import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import formatMoney from './formatMoney';
import calculateTotalOrder from './calculateTotalOrder';
import getNameAndPrice from './getNameAndPrice';

export default function usePizza({ pizzas, values }) {
  // Create state to hold the pizza order
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Make a new function to add pizzas to the order
  function addPizzaToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // Make a function to remove pizzas from the order
  function removePizzaFromOrder(index) {
    setOrder([
      // All before the pizza we want to remove
      ...order.slice(0, index),
      // All after the pizza we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // This function will run when the user submits the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // Get all the info
    const body = {
      order: getNameAndPrice(order, pizzas),
      total: formatMoney(calculateTotalOrder(order, pizzas)),
      name: values.name,
      email: values.email,
      nypon: values.nypon,
    };

    // Send data to a serverless function when the user checks out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // Check that everything works OK
    if (res.status >= 400 && res.status < 600) {
      setLoading(true);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Your pizza is ready to pick up.');
    }
  }

  return {
    order,
    addPizzaToOrder,
    removePizzaFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
