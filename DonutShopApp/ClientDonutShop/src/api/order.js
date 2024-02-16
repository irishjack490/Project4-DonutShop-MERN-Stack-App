import apiUrl from '../apiConfig'
import axios from 'axios';

export const createOrder = (owner, newOrder) => {
    console.log('create order:', owner, newOrder)
  return axios({
    url:`${apiUrl}/orders/createorder`,
    method: 'POST',
    headers: {Authorization: `Token ${owner.token}`,
    'Content-Type': 'application/json'
    },
    data: {order: newOrder}
    });
};

export const getActiveOrders = (owner) => {
    console.log('Get users orders', owner)
  return axios({
    url:`${apiUrl}/orders/mine`,
    method: 'GET',
    headers: {Authorization: `Token ${owner.token}`,
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

