// TODO: #1 request expiration date to be sent from backend. Currently hardcoded
// TODO: #2 validation process could be improved if server generated cookies will be created with same host as front-end app running.

import { LOGGED_IN, LOGGED_OUT } from '../types/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const AUTH_COOKIE = 'auth_timestamp';
const authCookie = cookies.get(AUTH_COOKIE);



const initialState = {
    isAuthenticated: authCookie ? true : false, // session exist while cookie exist
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            const expires =  new Date();
            expires.setHours(expires.getHours() + 24); //add 24 hours

            //second parameter exist just for better validation purpose as empty string coerced to false
            cookies.set(AUTH_COOKIE, expires.toISOString(), {
                path: '/',
                expires,
                domain:window.location.hostname //create a cookie per domain/host
            });
            return {
                isAuthenticated: true,
            };
        case LOGGED_OUT:
            cookies.remove(AUTH_COOKIE);
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
