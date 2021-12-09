import { SET_USER_DATA, DESTROY_USER_DATA } from '../types/user';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const _USER_COOKIE = 'user';
import {getCookieHost} from '../../utils';


let initialState = null;

const sessionCookie = cookies.get('access_token');
const userCookies = cookies.get(_USER_COOKIE);

//Parse _USER_COOKIE if exist
if (sessionCookie && userCookies) {
    initialState = JSON.parse(window.atob(userCookies));
}

const getCookieOpt=()=>({ path: '/', domain:getCookieHost() });


export default function (state = initialState, action) {

    switch (action.type) {
        case SET_USER_DATA:
            const expires =  new Date();
            expires.setHours(expires.getHours() + 1); //add 1 h
            const cookieOpt=getCookieOpt();
            cookieOpt.expires=expires;

            const userData = action.payload;
            userData.isObsessUser = userData.client=='5b3a605cb197ec77a274b150';

            cookies.set(_USER_COOKIE, window.btoa(JSON.stringify(userData)), cookieOpt);
            return userData;

        case DESTROY_USER_DATA:
            cookies.remove(_USER_COOKIE, getCookieOpt());
            return null;

        default:
            return state;
    }
}
