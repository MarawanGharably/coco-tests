import axiosApi from "../utils/axiosApi";
import Cookies from "universal-cookie";
import { setUserData } from "../store/actions/userActions";

const cookies = new Cookies();
const user_COOKIE = "user";




export const createUser = (data) => {
    return axiosApi
        .post(`/users/create`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response.data));
};


export const updateUser = (userName, data) => {
    console.log('>updateUser', {userName, data} );
    return axiosApi
        .put(`/users/${userName}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};

/**
 * get list of users
 */
export const getUsers = () => {
    return axiosApi
        .get(`/users`)
        .then((res) => {
            return res.data.map((item) => {
                return {
                    Username: item.Username,
                    given_name: item.given_name || '',
                    UserCreateDate: item.UserCreateDate,
                    UserLastModifiedDate: item.UserLastModifiedDate,
                    UserStatus: item.UserStatus,
                    Enabled: item.Enabled,
                    email: item.email,
                    email_verified: item.email_verified === 'true',
                    Attributes: item.Attributes,
                    subId: item['sub'],
                    id: item['sub'],
                };
            });
        })
        .catch((err) => Promise.reject(err));
};

/**
 * get current user data
 */
export const getCurrentUserData = () => dispatch => {
    const sessionCookie = cookies.get('access_token');
    if (sessionCookie) {
        if (cookies.get(user_COOKIE) && cookies.get(user_COOKIE) !== undefined) {
            const userData = JSON.parse(window.atob(cookies.get(user_COOKIE)));
            dispatch(setUserData(userData));
        } else {
            axiosApi
            .get(`/users/user`)
            .then((res) => {
                cookies.set(user_COOKIE, window.btoa(JSON.stringify(res.data)))
                dispatch(setUserData(res.data));
            })
            .catch((err) => Promise.reject(err));
        }
    }
};

/**
 * Fetch User Data
 * @param userId
 * @returns {Promise}
 */
export const getUserDataWithId = (userId) => {
    if (!userId) return Promise.reject('Missed required parameter');

    return axiosApi
        .get(`/users/${userId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};
