import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { showOrder } from "../../api/order"
import { Card, CardTitle, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ShowOrder = (props) => {
    const { id } = useParams()
    const { user, msgAlert } = props
    const  [order, setOrder] = useState(null)

    useEffect(() => {
        showOrder(id)
        .then(res => setOrder(res.data.order)) 
        .catch(error => {
            msgAlert({
                heading: 'Oh no!',
                message: messages.generalError,
                variant: 'danger'
            })
            
        })
}, [])
        
           
    const checkOut = (order) => {
        //logic 
        console.log('Checkout:', order);
      };
    
      let orderCards = null;

      if (order) {
        orderCards = order.map((order) => (
          <Card key={order._id} style={{ width: '30%', margin: 5 }}>
            <Card.Header>Order</Card.Header>
            <Card.Body>
              <Card.Text>
                {order.donuts}
                {order.coffees}
                {order.status}
              </Card.Text>
              <Card.Footer>Total cost $</Card.Footer>
              <Button onClick={() => checkOut(order)}>Checkout</Button>
            </Card.Body>
          </Card>
        ));
      }
    
      return (
        <div className="container-md" style={cardContainerLayout}>
          {orderCards}
        </div>
      );
    };
    
    export default ShowOrder;