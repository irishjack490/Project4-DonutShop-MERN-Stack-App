import apiUrl from '../apiConfig'
import axios from 'axios';

// export const getUserOrders = (user) => {
//     // Ensure the user object and token are defined
//     if (!user || !user.token) {
//       console.error('User or user token is undefined');
//       return Promise.reject('User or user token is undefined');
//     }
  
//     // Construct the axios configuration object
//     const axiosConfig = {
//       url: `${apiUrl}/orders/mine`,
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${user.token}`, 
//         'Content-Type': 'application/json',
//       },
//     };
  
//     // Perform the axios request
//     return axios(axiosConfig)
//         .then((response) => {
//             console.log('Response from getUserOrders API:', response.data); // Log the response data
//             return response.data.orders; // Extract orders from response data
//         })
//         .catch((error) => {
//             console.error('Error fetching user orders:', error);
//             throw error; // Re-throw the error for further handling
//         });
// };
  
  export const getOneDonut = (id) => {
    return axios(`${apiUrl}/donuts/${id}`)
}


export const updateOrder = (id) => {
    return axios.post(`${apiUrl}/orders/${id}`)
}



