import axiosApi from '../utils/axiosApi';
const { API_URL } = process.env;

// const POLICIES_API = `${API_URL}/admin/access/policy`;
// const POLICIES_API = `${API_URL}/user-groups/access/policy`;
const POLICIES_API = `${API_URL}/user-groups`;


/**
 * Fetching List of UserGroups
  * @returns {Promise}
 */
export const getPolicies=()=>{
    return axiosApi
        .get(`${POLICIES_API}/`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

export const getStorePolicy=(storeId)=>{
    if(!storeId) return Promise.reject('storeId - required parameter');
    return axiosApi
        .get(`${POLICIES_API}/store-policy/${storeId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


export const createStorePolicy=(data)=>{
    return axiosApi
        .put(`${POLICIES_API}/store-policy`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}



export const addUserToStorePolicy=(data)=>{
    return axiosApi
        // .post(`${API_URL}/admin/access/add_user_to_store`, data)
        .post(`${POLICIES_API}/add_user_to_store`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}