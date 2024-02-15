import apiUrl from '../apiConfig'
import axios from 'axios';

export const createOrder = (orderData) => {
  return axios.post(`${apiUrl}/orders/create-order`, orderData);
};

export const showOrder = (id) => {
    return axios.post(`${apiUrl}/orders/${id}`)
}

export const updateOrder = (id) => {
    return axios.post(`${apiUrl}/orders/${id}`)
}

