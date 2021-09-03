import axiosApi from "../utils/axiosApi";
import { setUserData } from "../store/actions/userActions";


export const createUser = (data) => {
    if (!data) return Promise.reject('Missed required parameter');

    return axiosApi
        .post(`/users/create`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response.data));
};


export const updateUser = (userName, data) => {
    if (!userName || !data) return Promise.reject('Missed required parameter');

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
export const getCurrentUserData = (options) =>dispatch=> {
    return axiosApi
        .get(`/users/user`)
        .then((res) => {
            //Update Store if required
            if(options?.updateUserStore) dispatch(setUserData(res.data));

            return res.data;
        })
        .catch((err) => Promise.reject(err));
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
