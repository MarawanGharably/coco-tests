import axiosApi from '../utils/axiosApi';
const { API_URL } = process.env;
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




/**
 * Fetch User access groups
 * @param userName
 */
export const getUserAccessGroups=(userName)=>{
    if(!userName) return Promise.reject('userName - required parameter');

    return axiosApi
        .get(`${POLICIES_API}/get_user_groups/${userName}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}




/**
 * Fetch User Access Groups and associated Stores data
 */
export const getUserAccessGroupsWithData= async(userName)=>{
    if(!userName) return Promise.reject('userName - required parameter');

    return axiosApi
        .get(`${POLICIES_API}/get_user_groups_with_data/${userName}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}