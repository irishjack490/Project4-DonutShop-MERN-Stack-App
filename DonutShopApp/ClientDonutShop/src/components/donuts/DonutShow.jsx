import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneDonut} from  '../../api/donut'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const DonutShow = (props) => {
    const { donutId } = useParams()
    const { user, msgAlert } = props

    const [donut, setDonut] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getOneDonut(donutId)
            .then(res => setDonut(res.data.donut))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [])

    const addToCart = () => {
        // Implement the logic to add the selected donut to the cart
        // This might involve updating the cart state or making an API request
        // You can use libraries like Redux or context for state management
    };

    if (!donut) {
        return <LoadingScreen />;
    }

    return (
        <Container>
            <Card>
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

