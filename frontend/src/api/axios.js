import axios from 'axios';
import store from '../store';


export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true
})

export const axiosPrivate = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json'
    }
})

axiosPrivate.interceptors.response.use(resolve => resolve, async reject => {

    if (reject.response.status === 401 && !reject.response.sent) {
        reject.response.sent = true;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const response = await axios.post('http://127.0.0.1:8000/api/users/refresh/', {
            "refresh": `${userInfo.refresh}`
        });
        // console.log(response);
        // console.log(userInfo);

        if (response.status === 200) {
            reject.config.headers['Authorization'] = `Bearer ${response.data.access}`
            // sessionStorage.setItem('access_token', response.data.access);
            userInfo.token = response.data.access;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            store.dispatch({ type: 'USER_LOGIN_REFRESH', payload: userInfo });
            return axiosPrivate(reject.config);
        }
    }
    
    return Promise.reject(reject);
})

// INTERCEPTORS

// axios.interceptors.response.use(
//     response => response,
//     async error => {
//         if (error.response.status === 401) {
//             const newToken = await refreshToken();
//             localStorage.setItem('authToken', newToken);
//             // Retry the original request
//             return axios(error.config);
//         }
//         return Promise.reject(error);
//     }
// );

// axios.interceptors.request.use(config => {
//     const authToken = localStorage.getItem('authToken');
//     if (authToken) {
//         config.headers.Authorization = `Bearer ${authToken}`;
//     }
//     return config;
// });