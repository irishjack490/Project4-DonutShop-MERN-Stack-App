import React from 'react';
import { Card, CardText } from 'react-bootstrap'; // Import Card component from react-bootstrap
//import OrderItem from './OrderItem'; // Component to display each order item

const OrdersPage = ({ orders }) => {
    console.log('Orders:', orders);//this console log shows the structure of the orders array

 
    return (
      <div>
          <h2>Here is your order</h2>
          <div className="card-container">
              {/* Iterate over the donuts array */}
              {orders.donuts.map((donut, index) => (
                  <Card key={`donut-${index}`} className="mb-3">
                    <Card.Body>
                       {donut.name}
                      ${donut.price}
                    </Card.Body>
                  </Card> 
              
              ))}
              {/* Iterate over the coffees array */}
              {orders.coffees.map((coffee, index) => (
                  <Card key={`coffee-${index}`} className="mb-3">
                    <Card.Body>
                   {coffee.name}
                   {coffee.size}
                  ${coffee.price}
                    </Card.Body>
                      {/* <Card.Body>
                          <OrderItem order={coffee} orders={orders}/>
                      </Card.Body> */}
                  </Card>
              ))}
          </div>
      </div>
  );
};

export default OrdersPage;




