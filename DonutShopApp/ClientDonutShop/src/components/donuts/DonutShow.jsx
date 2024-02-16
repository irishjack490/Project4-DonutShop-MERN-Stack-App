import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneDonut } from  '../../api/donut'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

const DonutShow = (props) => {
    const { id } = useParams()
    const { user, msgAlert } = props

    const [donut, setDonut] = useState(null)
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

   

    useEffect(() => {
        getOneDonut(id)
            .then(res => setDonut(res.data.donut))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                
            })
    }, [updated])
    


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
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DonutShow;

