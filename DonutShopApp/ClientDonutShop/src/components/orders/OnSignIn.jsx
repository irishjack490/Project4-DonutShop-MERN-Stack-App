import { useEffect, useState } from 'react';
import {  createOrder, getActiveOrders } from '../../api/order';
import { useNavigate } from 'react-router-dom';

const OnSignIn = ({ user, msgAlert }) => {
    const [orders, setOrders] = useState([]);
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
                            setOrders([activeOrder]);
                        } else {
                            createOrder(user)
                                .then(newOrderResponse => {
                                    setOrders([newOrderResponse.data]);
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

    // useEffect(() => {
        
    //     if (orders.length > 0) {
    //         // There is an active order
    //         navigate('/checkout');
    //     }
    // }, [orders, navigate]);

    return null; // This component doesn't render anything visible
};

export default OnSignIn;