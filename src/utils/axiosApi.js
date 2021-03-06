import axios from 'axios';
import Cookies from 'universal-cookie';
import { getLoginRedirectPath } from "./urlHelper";
import getConfig from 'next/config';

const cookies = new Cookies();

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL;


const instance = axios.create({
    baseURL: API_URL,
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
    const error_code = error.response?.data?.error_code;


    //401 - unauthorized. Dont use! Could be returned on longin form when bad credentials sent
    // Fixed above
    if([401].includes(statusCode) || message === 'Refresh Token has been revoked' || error_code === 'USER_NOT_FOUND'){
        //remove session cookies
        cookies.remove('access_token');
        cookies.remove('refresh_token');
        cookies.remove('user');
        if(process.browser) window.location.href = getLoginRedirectPath();
    }

    return Promise.reject(error);
};

//Catch response status
instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
