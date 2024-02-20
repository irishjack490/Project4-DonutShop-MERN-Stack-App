import React from 'react';
import { Card, CardText } from 'react-bootstrap'; // Import Card component from react-bootstrap
import OrderItem from './OrderItem'; // Component to display each order item

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




//This was pulling test order in Mongoose, other users were not able to place orders
// import {useState, useEffect} from 'react'
// import { getUserOrders } from "../../api/order"

// import OrderDonutDetails from './OrderDonutDetails'


// //for rendering
// import LoadingScreen from '../shared/LoadingScreen'
// import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import messages from '../shared/AutoDismissAlert/messages'



// const cardContainerLayout = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }

// const OrdersPage = (props) => {
//     const [order, setOrder] = useState(null)
//     const [error, setError] = useState(null)
//     const [updated, setUpdated] = useState(false)
//     const { user, msgAlert } = props

//     useEffect(() => {
//         console.log('User Object', user)
//         getUserOrders(user)
//         .then(orderData => {
            
//             console.log('useEffect hook ran')
//             console.log('order data', orderData )
//             setOrder(orderData)
//             console.log('order', order)
            
//         })
//         .catch(error => {
//             setError(error)
//         })
//     }, [user])
        

//     if (error) {
//         return <LoadingScreen />
//     }
//     if(!order){
//         return <LoadingScreen />
//     }
//     else if(order.length===0){
//         return <p>There are no current orders yet!</p>
//     }

//     // Define the handleCheckOut function
//   function handleCheckOut(e) {
//     console.log('checkout button clicked');
//     e.preventDefault();
//     // Handle checkout logic
//   }

//   // Map over each order to render a Card component
//   const orderCards = order.map((orderItem) => {
//     console.log('Current Order:', orderItem);
//     return (
//       <Card key={orderItem._id} style={{ width: '30%', margin: 5 }}>
//         <Card.Header>Your Order</Card.Header>
//         <Card.Body>
//           {/* Render user email and order ID */}
//           <p>{user.email}</p>
//           <p>Order ID {orderItem._id}</p>
          
//           {/* Map over each donut in the order and render OrderDonutDetails component */}
//           {orderItem.donuts.map((donut, index) => (
//              <OrderDonutDetails key={index} donut={donut} msgAlert={msgAlert} />
//           ))}
//         </Card.Body>
//       </Card>
//     );
//   });

//   return (
//     <div className="container-md" style={cardContainerLayout}>
//       {/* Render the order cards */}
//       {orderCards}
//       {/* Render a button for checkout */}
//       <button className='btn btn-info' onClick={handleCheckOut}>Add to Cart</button>
//     </div>
//   );
// };

// export default OrdersPage;