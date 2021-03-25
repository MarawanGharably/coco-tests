import * as types from '../types';
import axiosApi from '../../utils/axiosApi';

export const { API_URL } = process.env;

const LOGIN_URL = `${API_URL}/auth/login`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const RESET_PASSWORD_BY_EMAIL_URL = `${API_URL}/auth/reset-password-by-email`;
const RESET_PASSWORD_CONFIRM_CODE = `${API_URL}/auth/reset-password-confirm-code`;
const SET_PASSWORD_URL = `${API_URL}/auth/password`;

// export const singUp = (email, password) => (dispatch) => {};

export const resetPassword = (username, oldPassword, newPassword) => dispatch => {
    if (!username && !oldPassword && !newPassword) return Promise.reject(new Error({ error: 'Missed required parameters' }));

    return axiosApi
        .post(SET_PASSWORD_URL, { username, oldPassword, newPassword })
        .then(res => {
            dispatch({ type: types.LOGGED_IN, payload: true });
            return res;
        })
        .catch(err => err.response);
};

/**
 * Reset User Password Flow in Cognito returns a confirmation code by email/phone
 * which should be confirmed
 * @param code
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const resetPasswordConfirmCode = (email, code, password) => {
    if (!email || !code || !password) return false;

    return axiosApi
        .post(RESET_PASSWORD_CONFIRM_CODE, {
            email: email.trim(),
            code: code.trim(),
            password: password.trim(),
        })
        .then(res => res)
        .catch(err => Promise.reject(err.response));
};

export const resetPasswordByEmail = email => {
    if (!email) Promise.reject(new Error(false));

    return axiosApi
        .get(`${RESET_PASSWORD_BY_EMAIL_URL}?email=${email.trim()}`)
        .then(res => res)
        .catch(err => Promise.reject(err.response));
};



export const logIn = (email, password) => dispatch => {
    if (!email || !password) Promise.reject(new Error(false));
    return axiosApi
        .post(LOGIN_URL, { username: email, password })
        .then(res => {
            dispatch({ type: types.LOGGED_IN, payload: true });
            return res;
        })
        .catch(err => Promise.reject(err.response));
};

export const logOut = () => dispatch => axiosApi
    .get(LOGOUT_URL)
    .then(res => {
        dispatch({ type: types.LOGGED_OUT, payload: false });
        return res;
    })
    .catch(err => err);
