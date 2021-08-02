import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

const handleError = (error, xx) => {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message;


    //401 - unauthorized. Dont use! Could be returned on longin form when bad credentials sent
    if([403].includes(statusCode) || message === 'Refresh Token has been revoked'){
        //remove session cookies
        cookies.remove('access_token');
        cookies.remove('refresh_token');
        cookies.remove('auth_timestamp');
        console.log('>axios, redirect', `${process.env.BASE_PATH || ''}/auth/login/`);
        window.location.href = `${process.env.BASE_PATH || ''}/auth/login/`;
    }

    return Promise.reject(error);
};

//Catch response status
instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
