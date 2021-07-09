import axiosApi from '../utils/axiosApi';
const { API_URL } = process.env;

export const createUser = (data) => {
    return axiosApi
        .post(`${API_URL}/users/create`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};

/**
 * get list of Users
 */
export const getUsers = () => {
    return axiosApi
        .get(`${API_URL}/users/`)
        .then((res) => {
            const users = res.data.map((item) => {
                const Attributes = {};
                item['Attributes'].map((item) => {
                    Attributes[item.Name] = item['Value'];
                });

                return {
                    Username: item.Username,
                    given_name: Attributes.given_name || '',
                    UserCreateDate: item.UserCreateDate,
                    UserLastModifiedDate: item.UserLastModifiedDate,
                    UserStatus: item.UserStatus,
                    Enabled: item.Enabled,
                    email: Attributes.email,
                    email_verified: Attributes.email_verified == 'true' ? true : false,
                    Attributes: item.Attributes,
                    subId: Attributes['sub'],
                    id: Attributes['sub'],
                };
            });
            return users;
        })
        .catch((err) => Promise.reject(err));
};

/**
 * Fetch User Data
 * @param userId
 * @returns {Promise}
 */
export const getUser = (userId) => {
    if (!userId) return Promise.reject('Missed required parameter');

    return axiosApi
        .get(`${API_URL}/users/${userId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};


