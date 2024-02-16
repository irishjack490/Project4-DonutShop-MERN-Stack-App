// Under construction, I have not implemented this
import React, { useState } from 'react';

//Want to use these for later, I haven't passes this form as a prop yet
// import { useHistory } from 'react-router-dom';
// import { createOrder } from "../../api/order"

const CheckoutPage = ({ orderDetails }) => {
  const [order, setOrder] = useState(orderDetails);
  const history = useHistory();

  const handleSubmitOrder = () => {
    createOrder.submitOrder(order)
      .then(response => {
        alert('Order successfully submitted!');
        history.push('/confirmation'); // Will redirect to confirmation page
      })
      .catch(error => {
        console.error('Error submitting order:', error);
        alert('Error submitting order. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Checkout</h1>
      {/* Will display order details for review */}
      <p>Order Summary:</p>
      {/* Will Rrender order details here */}
      <button onClick={handleSubmitOrder}>Submit Order</button>
    </div>
  );
};

export default CheckoutPage;