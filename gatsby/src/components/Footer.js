import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">&copy; Pizzeria {new Date().getFullYear()}</p>
      <p className="center">Check Our Beers</p>
    </footer>
  );
}
