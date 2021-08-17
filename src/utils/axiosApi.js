import axios from 'axios';
import Cookies from 'universal-cookie';
import { getLoginRedirectPath } from "./urlHelper";
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
    const error_code = error.response?.data?.error_code;


    //401 - unauthorized. Dont use! Could be returned on longin form when bad credentials sent
    if([403].includes(statusCode) || message === 'Refresh Token has been revoked' || error_code === 'USER_NOT_FOUND'){
        //remove session cookies
        cookies.remove('access_token');
        cookies.remove('refresh_token');
        window.location.href = getLoginRedirectPath();
    }

    return Promise.reject(error);
};

//Catch response status
instance.interceptors.response.use(handleSuccess, handleError);

export default instance;
