import {useState, useEffect} from 'react'
import { createOrder, getAllOrders } from "../../api/order"



//for rendering
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const OrdersIndex = (props) => {
    //two pieces of state rendering
    //const [orders, setOrders] = useState(null)
    const [error, setError] = useState(false)
    

    const { msgAlert, orders, user } = props

    useEffect(() => {
    //     getAllOrders()
    //     .then(res => {
    //         console.log('useEffect hook ran')
    //         //setOrders(res.data.orders)
    //     })
    //     .catch(err => {
    //         msgAlert({
    //             heading: 'Oh no!',
    //             message: messages.generalError,
    //             variant: 'danger'
    //     })
    //     setError(true)
    // })
}, [])
        

    if (error) {
        return <LoadingScreen />
    }
    if(!orders){
        return <LoadingScreen />
    }
    else if(orders.length===0){
        return <p>No orders yet</p>
    }

    const orderCards = orders.map(order => (
        <Card key={order._id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{order.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/orders/${order._id}`} className='btn btn-info'>
                        More details
                    </Link>
                </Card.Text>
                
                    <Card.Footer>Thank you for your business </Card.Footer>
                    {/* <button onClick={() => addToOrder(donut)}>Add to Order</button> */}
            
            </Card.Body>
        </Card>
    ))
      function handleCheckOut (e) {
        console.log('checkout button clicked')
        e.preventDefault()
        createOrder(user, orders)
        
      }
    return (
        <div className="container-md" style={ cardContainerLayout }>
            { orderCards }
            <button className='btn btn-info' onClick={handleCheckOut}>Checkout</button> 
        </div>
    )
}


export default OrdersIndex