import React from 'react';
import { Card, CardText, Button} from 'react-bootstrap'; // Import Card component from react-bootstrap


const OrdersPage = ({ orders }) => {
    console.log('Orders:', orders);//this console log shows the structure of the orders array

    if (!orders || (!orders.donuts && !orders.coffees)) {
      return (
        <div className="empty-orders">
          <h2>Your order is empty!</h2>
          <p>It looks like you haven't added any items to your order yet.</p>
          <p>Feel free to explore our delicious donuts and coffees and add some to your order.</p>
        </div>
      );
  }


  
    return (
      <div>
          <h2>Here is your order</h2>
          <div className="card-container">
              {/* Iterate over the donuts array */}
              {orders.donuts && orders.donuts.map((donut, index) => (
                <Card key={`donut-${index}`} className="mb-3">
                    <Card.Body>
                       {donut.name}
                       ${donut.price}
                    </Card.Body>
                </Card> 
              
              ))}
              {/* Iterate over the coffees array */}
              {orders.coffees && orders.coffees.map((coffee, index) => (
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




