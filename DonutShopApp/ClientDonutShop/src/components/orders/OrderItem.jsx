import React from 'react';
import { Card } from 'react-bootstrap';

const OrderItem = ({ order }) => {
  // Check if order is undefined or null
  if (!order) {
    return <div>Loading...</div>;
  }

  console.log('Order:', order);

  // Extract donuts and coffees arrays from the order object
  const { donuts, coffees } = order;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Order ID: {order._id}</Card.Title>
        <h4>Donuts:</h4>
        <ul>
          {donuts && donuts.map((donut, index) => (
            <li key={index}>
              <p>Name: {donut.name}</p>
              <p>Description: {donut.description}</p>
              <p>Price: ${donut.price}</p>
            </li>
          ))}
        </ul>
        <h4>Coffees:</h4>
        <ul>
          {coffees && coffees.map((coffee, index) => (
            <li key={index}>
              <p>Name: {coffee.name}</p>
              <p>Description: {coffee.description}</p>
              <p>Price: ${coffee.price}</p>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default OrderItem;