import apiUrl from '../apiConfig'
import axios from 'axios'

//READ -> Index
//axios default func is to send GET request
export const getAllDonuts = () => {
    return axios(`${apiUrl}/donuts`)
}

//READ -> Show
export const getOneDonut = (id) => {
    return axios(`${apiUrl}/donuts/${id}`)
}