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
                getActiveOrders(user)
                    .then(response => {
                        const activeOrder = response.data.order;
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
    }, [user, msgAlert]);

    useEffect(() => {
        
        if (orders.length > 0) {
            // There is an active order
            navigate('/checkout');
        }
    }, [orders, navigate]);

    return null; // This component doesn't render anything visible
};

export default OnSignIn;