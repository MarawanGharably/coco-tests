import * as types from '../types/auth';
import axiosApi from '../../utils/axiosApi';

export const { API_URL } = process.env;

export const resetPassword = (username, oldPassword, newPassword) => (dispatch) => {
    if (!username && !oldPassword && !newPassword) return Promise.reject(new Error({ error: 'Missed required parameters' }));

    return axiosApi
        .post(`${API_URL}/auth/password`, { username, oldPassword, newPassword })
        .then((res) => {
            dispatch({ type: types.LOGGED_IN, payload: true });
            return res;
        })
        .catch((err) => Promise.reject(err));
};

/**
 * Reset User Password Flow in Cognito returns a confirmation code by email/phone
 * which should be confirmed
 * @param code
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const resetPasswordConfirmCode = (email, code, password) => {
    if (!email || !code || !password) return Promise.reject(new Error(false));

    return axiosApi
        .post(`${API_URL}/auth/reset-password-confirm-code`, {
            email: email.trim(),
            code: code.trim(),
            password: password.trim(),
        })
        .then((res) => res)
        .catch((err) => Promise.reject(err.response));
};

export const resetPasswordByEmail = (email) => {
    if (!email) return Promise.reject(new Error(false));

    return axiosApi
        .get(`${API_URL}/auth/reset-password-by-email?email=${email.trim()}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response));
};

export const logIn = (email, password) => (dispatch) => {
    if (!email || !password) return Promise.reject(new Error('Missed required parameters'));
    return axiosApi
        .post(`${API_URL}/auth/login`, {
            username: email.trim(),
            password: password.trim(),
        })
        .then((res) => {
            dispatch({ type: types.LOGGED_IN, payload: true });
            return res;
        })
        .catch((err) => Promise.reject(err.response));
};

export const logOut = () => (dispatch) => {
    return axiosApi
        .get(`${API_URL}/auth/logout`)
        .then((res) => res)
        .catch((err) => err)
        .finally(()=>{
            //remove session state in any response condition
            dispatch({ type: types.LOGGED_OUT, payload: false });
        });
};
