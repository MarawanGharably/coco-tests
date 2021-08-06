import { LOGGED_IN, LOGGED_OUT } from '../types/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const AUTH_COOKIE = 'access_token';
const authCookie = cookies.get(AUTH_COOKIE);


const initialState = {
    isAuthenticated: !!authCookie, // session exist while cookie exist
    user:null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return {
                isAuthenticated: true,
                user:action.payload
            };

        case LOGGED_OUT:
            let cookieHost = window.location.hostname;
            if(process.env.NODE_ENV === 'production'){
                cookieHost = cookieHost.split('.').slice(1).join('.');
            }

            //options MUST be present
            cookies.remove(AUTH_COOKIE, { path: '/', domain:cookieHost });
            cookies.remove('refresh_token', {path: '/', domain:cookieHost });

            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
