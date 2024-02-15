import apiUrl from '../apiConfig'
import axios from 'axios'

//READ -> Index
export const getAllCoffees = () => {
    return axios(`${apiUrl}/coffees`)
}

//READ -> Show
export const getOneCoffee = (id) => {
    return axios(`${apiUrl}/coffees/${id}`)
}