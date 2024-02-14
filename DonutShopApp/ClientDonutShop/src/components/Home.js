import DonutsIndex from './donuts/DonutsIndex'


const Home = (props) => {
	const { msgAlert, user } = props
	//console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<DonutsIndex msgAlert={msgAlert}/>
		</>
	)
}

export default Home
