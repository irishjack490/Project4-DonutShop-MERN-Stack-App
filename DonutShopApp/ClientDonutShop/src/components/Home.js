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
		<div className="intro-section">
			<h2>Welcome to the Donuts & Coffee Shop!</h2>
			<p>Indulge your senses with our delectable range of freshly baked donuts and aromatic coffees.</p>
			<p>Choose from a variety of mouthwatering flavors and pair them with your favorite brew.</p>
			<p>Whether you're craving a sweet treat or in need of a caffeine boost, we've got you covered.</p>
			<p>Explore our menu, place your order, and treat yourself to a delightful experience!</p>

			<p>Must sign in to add items to order</p>
			
		</div>
			
		</>
	)
}

export default Home
