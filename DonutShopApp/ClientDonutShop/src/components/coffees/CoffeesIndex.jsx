import {useState, useEffect} from 'react'
import { getAllCoffees } from "../../api/coffee"
// used for rendering things
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// react allows you to create something called a styling object
const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const CoffeesIndex = (props) => {
    // first we want two pieces of state to use for rendering
    const [coffees, setCoffees] = useState(null)
    const [error, setError] = useState(false)
    //const [order, setOrder] = useState([])

    // we'll destructure our props
    const { msgAlert, order, setOrder} = props

    // useEffect is an effect hook, and it requires two args
	// the first is a callback function
	// the second arg is a dependency array
	// the dependency array, tells react when to run the effect hook. If we want this to run only on the first render and anytime the page refreshes, we keep the dependency array empty
	// useEffect is called RIGHT after the FIRST render of the component
	useEffect(() => {
		getAllCoffees()
			// .then(res => console.log('coffees from axios call: \n', res.data.coffees))
			.then(res => {
				console.log('use Effect hook ran')
				setCoffees(res.data.coffees)
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

    const addToOrder = (coffee) => {
        console.log('Before adding coffee to order:', order);
        const updatedOrder = { ...order }; // Create a copy of the order object
    
        // Check if the coffees array exists in the order object
        if (!updatedOrder.coffees) {
            updatedOrder.coffees = []; // Initialize the coffees array if it doesn't exist
        }
    
        // Add the coffee to the coffees array in the order object
        updatedOrder.coffees.push(coffee);
    
        console.log('After adding coffee to order:', updatedOrder);
        setOrder(updatedOrder); // Update the state with the modified order object
    };


    if (error) {
        return <LoadingScreen />
    }

    // what if we have no data?
    if (!coffees) {
        return <LoadingScreen />
    // what if the expected array is empty?
    } else if (coffees.length === 0) {
        return <p>Coffee brewing, check back later</p>
    }

    // what do we display when our data comes through fine?
    // we want to loop over the array of coffees
    // and produce one card for each and every coffee we get back from the db
    const coffeeCards = coffees.map(coffee => (
        <Card key={coffee._id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{coffee.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/coffees/${coffee._id}`} className='btn btn-info'>
                        {coffee.description}
                        
                    </Link>
                </Card.Text>
                        <Card.Footer>Price ${coffee.price}</Card.Footer>
                        <button onClick={() => addToOrder(coffee)}>Add to Order</button>
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { coffeeCards }
        </div>
    )
}

export default CoffeesIndex