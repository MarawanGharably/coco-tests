import axiosApi from "../utils/axiosApi";
const { API_URL } = process.env;

/**
 * get all stores
 */
export const getStores=()=>{}

/**
 * get single store data
 */
export const getStore=(storeId)=>{}



export const getStoreFlags=(storeId)=>{
    if(!storeId) return Promise.reject('Missed required parameter');

    const config={
        headers:{'ovr-str-id': storeId}
    }
    return axiosApi
        .get(`${API_URL}/cms/${storeId}/flags`, config)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}