import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneCoffee } from  '../../api/coffee'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const OrderShow = (props) => {
    const { id } = useParams()
    const { user, msgAlert } = props
    const [coffee, setCoffee] = useState(null)
    const [order, setOrder] = useState(null)

    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getOneCoffee(id)
            .then(res => setCoffee(res.data.coffee))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                
            })
    }, [updated])
    


    if (!coffee) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Card >
                <Card.Img variant="top"  />
                <Card.Body>
                    <Card.Title>{coffee.name}</Card.Title>
                    <Card.Text>{coffee.description}</Card.Text>
                    <Card.Text>Price: ${coffee.price}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderShow;

