import apiUrl from '../apiConfig'
import axios from 'axios';


export const createOrder = (user, newOrder) => {
    console.log('create order:', user, newOrder)
  return axios({
    url:`${apiUrl}/orders/createorder`,
    method: 'POST',
    headers: {Authorization: `Token ${user.token}`,
    'Content-Type': 'application/json'
    },
    data: {order: newOrder}
    });
};

export const getActiveOrders = (user) => {
    console.log('Get users orders', user)
  return axios({
    url:`${apiUrl}/orders/mine`,
    method: 'GET',
    headers: {Authorization: `Token ${user.token}`,
    'Content-Type': 'application/json'
        }
    
    });
};



export const getAllOrders = () => {
    return axios.post(`${apiUrl}/orders`)
}

export const updateOrder = (id) => {
    return axios.post(`${apiUrl}/orders/${id}`)
}

export const getOneOrder = (id) =>{
    return axios.post(`${apiUrl}/orders/${id}`)
}

