import DonutsIndex from './donuts/DonutsIndex'
import OnSignIn from './orders/OnSignIn'
import { useEffect, useState } from 'react';
import {  createOrder, getActiveOrders } from '../api/order';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
	const { msgAlert, user, order, setOrder} = props
	//console.log('props in home', props)
	const navigate = useNavigate();



	return (
		<>
			<h2>Home Page</h2>
			{/* <DonutsIndex order={order} setOrder={setOrder} msgAlert={msgAlert}/> */}
			{/* <OnSignIn user={user} msgAlert={msgAlert}/> */}
		</>
	)
}

export default Home
