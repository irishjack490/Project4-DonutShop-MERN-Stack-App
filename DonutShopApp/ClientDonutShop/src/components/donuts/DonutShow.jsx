import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneDonut } from  '../../api/donut'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const DonutShow = (props) => {
    const { donutId } = useParams()
    const { user, msgAlert } = props

    const [donut, setDonut] = useState(null)

    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getOneDonut(donut._id)
            .then(res => setDonut(res.data.donut))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                
            })
    }, [updated])
    

    const addToCart = () => {
        // I will add some logic to add the selected donut to a cart
    
    };

    if (!donut) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Card >
                <Card.Img variant="top" src={donut.image} />
                <Card.Body>
                    <Card.Title>{donut.name}</Card.Title>
                    <Card.Text>{donut.description}</Card.Text>
                    <Card.Text>Price: ${donut.price}</Card.Text>
                    <Button onClick={addToCart}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DonutShow;

