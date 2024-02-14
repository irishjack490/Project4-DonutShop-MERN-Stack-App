import {useState, useEffect} from 'react'
import { getAllDonuts } from "../../api/donut"
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

const DonutsIndex = (props) => {
    //two pieces of state rendering
    const [donuts, setDonuts] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {
        getAllDonuts()
        .then(res => {
            console.log('useEffect hook ran')
            setDonuts(res.data.donuts)
        })
        .catch(error => {
            msgAlert({
                heading: 'Oh no!',
                message: messages.generalError,
                variant: 'danger'
        })
        setError(true)
    })
}, [])

    if (error) {
        return <LoadingScreen />
    }
    if(!donuts){
        return <LoadingScreen />
    }
    else if(donuts.lenght===0){
        return <p>Donuts baking checkback later</p>
    }

    const donutCards = donuts.map(donut => (
        <Card key={donut.id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{donut.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/donuts/${donut.id}`} className='btn btn-info'>
                         {donut.description}
                    </Link>
                </Card.Text>
                
                    <Card.Footer>Price ${donut.price}</Card.Footer>
            
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { donutCards }
        </div>
    )
}


export default DonutsIndex