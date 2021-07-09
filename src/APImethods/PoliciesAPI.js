import axiosApi from '../utils/axiosApi';
const { API_URL } = process.env;

const POLICIES_API = `${API_URL}/admin/access/policy`;


/**
 * Fetching List of Policies
  * @returns {Promise}
 */
export const getPolicies=()=>{
    return axiosApi
        .get(POLICIES_API)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


export const createStorePolicy=(data)=>{
    return axiosApi
        .post(POLICIES_API, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}



export const addUserToStorePolicy=(data)=>{
    return axiosApi
        .post(`${API_URL}/admin/access/add_user_to_store`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}