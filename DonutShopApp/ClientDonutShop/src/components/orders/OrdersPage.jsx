import React from 'react';
import { Card, CardText, Button} from 'react-bootstrap'; // Import Card component from react-bootstrap


const OrdersPage = ({ orders, onDeleteItemClick, DeleteItem }) => {
    console.log('Orders:', orders);//this console log shows the structure of the orders array
      // Calculate the total price of the order
      const calculateTotalPrice = () => {
          let totalPrice = 0;
  
          // Iterate over the donuts array
          orders.donuts.forEach(donut => {
              totalPrice += donut.price;
          });
  
          // Iterate over the coffees array
          orders.coffees.forEach(coffee => {
              totalPrice += coffee.price;
          });
  
          return totalPrice;
      };
  

    if (!orders || (orders.donuts.length === 0 && orders.coffees.length === 0)) {
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
                      <div className="item-details">
                        <div>
                        <span>{donut.name}</span>
                        <span>${donut.price}</span>
                        </div>
                       <DeleteItem type="donut" index={index} onDeleteItemClick={onDeleteItemClick} />
                       </div>
                    </Card.Body>
                </Card> 
              
              ))}
              {/* Iterate over the coffees array */}
              {orders.coffees && orders.coffees.map((coffee, index) => (
                  <Card key={`coffee-${index}`} className="mb-3">
                    <Card.Body>
              <div className="item-details">
                  <div>
                    <span>{coffee.name}</span>
                    <span>{coffee.size}</span>
                    <span>${coffee.price}</span>
                   </div>
                  <DeleteItem type="coffee" index={index} onDeleteItemClick={onDeleteItemClick} />
                  </div>
                    </Card.Body>
                      {/* <Card.Body>
                          <OrderItem order={coffee} orders={orders}/>
                      </Card.Body> */}
                  </Card>
              ))}
          </div>
          <div className="total-price">
                Total Price: ${calculateTotalPrice()}
          </div>
      </div>
  );
};

export default OrdersPage;




