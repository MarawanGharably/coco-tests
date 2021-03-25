import axios from 'axios';

const instance = axios.create({
    // baseURL: config.API_URL,
    crossDomain: true,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// const handleSuccess = () => {
//     console.log('Axios OK');
// };

// const handleError = () => {
//     console.log('Axios ERR');
// };

// instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
