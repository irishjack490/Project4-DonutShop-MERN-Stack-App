import DonutsIndex from './donuts/DonutsIndex'
import OnSignIn from './orders/OnSignIn'
import { useEffect, useState } from 'react';
import {  createOrder, getActiveOrders } from '../api/order';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
	const { msgAlert, user, order, setOrder} = props
	//console.log('props in home', props)
	const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // User is logged in, check User Orders
            const fetchOrders = () => {
                console.log('Donuts forever', user)
                getActiveOrders(user)
                    .then(orders => {
                        const activeOrder = orders.find(order => order.active)
                        if (activeOrder) {
                            setOrder([activeOrder]);
                        } else {
                            createOrder(user)
                                .then(newOrderResponse => {
                                    setOrder([newOrderResponse.data]);
                                })
                                .catch(error => {
                                    msgAlert({
                                        heading: 'Oh no!',
                                        message: 'Error creating new order',
                                        variant: 'danger'
                                    });
                                });
                        }
                    })
                    .catch(error => {
                        msgAlert({
                            heading: 'Oh no!',
                            message: 'Error fetching active order',
                            variant: 'danger'
                        });
                    });
            };

            fetchOrders();
        }
    }, []);

	return (
		<>
			<h2>Home Page</h2>
			{/* <DonutsIndex order={order} setOrder={setOrder} msgAlert={msgAlert}/> */}
			{/* <OnSignIn user={user} msgAlert={msgAlert}/> */}
		</>
	)
}

export default Home
