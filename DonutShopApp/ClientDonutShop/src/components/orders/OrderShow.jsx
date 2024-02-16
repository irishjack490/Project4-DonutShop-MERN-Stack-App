import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneOrder } from  '../../api/order'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const OrderShow = (props) => {
    const { id } = useParams()
    const { user, msgAlert } = props

    const [order, setOrder] = useState(null)
    

    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

   

    useEffect(() => {
        getOneOrder(id)
            .then(res => setOrder(res.data.order))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                
            })
    }, [updated])
    


    if (!order) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Card >
                <Card.Img variant="top"  />
                <Card.Body>
                    <Card.Title>{order.owner}</Card.Title>
                    <Card.Text>{order.donuts}</Card.Text>
                    <Card.Text>{order.coffees}</Card.Text>
                    
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderShow;

