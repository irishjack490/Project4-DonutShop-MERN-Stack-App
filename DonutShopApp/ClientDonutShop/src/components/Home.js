import DonutsIndex from './donuts/DonutsIndex'
import OnSignIn from './orders/OnSignIn'


const Home = (props) => {
	const { msgAlert, user, order, setOrder} = props
	//console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			{/* <DonutsIndex order={order} setOrder={setOrder} msgAlert={msgAlert}/> */}
			<OnSignIn user={user} msgAlert={msgAlert}/>
		</>
	)
}

export default Home
