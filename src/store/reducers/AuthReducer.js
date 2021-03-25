// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
// const access_token_c= cookies.get('access_token');
// const refresh_token_c= cookies.get('refresh_token');

// TODO: store.isAuthenticated = true even if no cookie present

import { LOGGED_IN, LOGGED_OUT } from '../types';

const LOCAL_STORAGE_LOGGED_IN_TIME_STAMP = 'LOCAL_STORAGE_LOGGED_IN_TIME_STAMP';
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const tenYearsInPast = new Date();
tenYearsInPast.setFullYear(tenYearsInPast.getFullYear() - 10);

const now = new Date();
const timeStampString = localStorage.getItem(LOCAL_STORAGE_LOGGED_IN_TIME_STAMP);
const timeStamp = new Date(timeStampString);
// Not all days have 24hrs (day light savings),
// but we don't care because we only need to loosely compare the time.
const elapsedDays = (now - timeStamp) / MS_PER_DAY;

const initialState = {
    isAuthenticated: elapsedDays > 0 && elapsedDays < 1, // 1 day login persistence
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            // It's okay if client time isn't consistent,
            // because we're using this for the same client.
            localStorage.setItem(LOCAL_STORAGE_LOGGED_IN_TIME_STAMP, new Date().toISOString());
            return {
                isAuthenticated: true,
            };
        case LOGGED_OUT:
            localStorage.setItem(LOCAL_STORAGE_LOGGED_IN_TIME_STAMP, tenYearsInPast.toISOString());
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
