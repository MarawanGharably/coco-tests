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

const handleSuccess = (response) => {
    return response;
};

const handleError = (error) => {
    const statusCode = error.response.status;
    //401 - unauthorized. Dont use! Could be returned on longin form when bad credentials sent
    if([403].includes(statusCode)){
        window.location.href = '/login';
    }

    return Promise.reject(error);
};

//Catch response status
instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
