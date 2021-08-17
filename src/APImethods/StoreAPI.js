import { formURL } from '../utils/urlHelper';
import axiosApi from '../utils/axiosApi';
import { publicRuntimeConfig } from '../../next.config.js';
const API_URL =  publicRuntimeConfig?.API_URL;

/**
 * get all stores
 * old:apiGetAllCMSStores =>cms/stores
 * old:/client/users/stores
 */
export const getStores=()=>{
    return axiosApi
        //api endpoint used at main page
        // .get(`${API_URL}/client/users/stores`)
        .get(`${API_URL}/stores`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


/**
 * get stores in a user access group
 */
export const getUserStores=()=>{
    return axiosApi
        .get(`${API_URL}/stores/users-stores`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


/**
 * get single store data
 */
export const getStore=(storeId)=>{
    if(!storeId) return Promise.reject(Error('storeId is required parameter'));
    return axiosApi
        .get(`${API_URL}/stores/${storeId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

/**
 * Update store data
 */
export const updateStore=(storeId, data)=>{
    if(!storeId) return Promise.reject(Error('storeId is required parameter'));

    return axiosApi
        .put(`${API_URL}/stores/${storeId}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}




export const getStoreFlags=(storeId)=>{
    console.log('>getStoreFlags', {storeId, config });
    if(!storeId) return Promise.reject('Missed required parameter');

    const config={
        headers:{'ovr-str-id': storeId}
    }
    return axiosApi
        .get(`${API_URL}/cms/${storeId}/flags`, config)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}



export const getStoreScenes = (storeId) => {
    if (!storeId) return Promise.reject('Missed required param');

    const conf = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .get(`${API_URL}/cms/${storeId}/scenes`, conf)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};



const getFirstSceneImageUrl = (storeId) => {
    const OBSESS_GREY_LOGO = 'https://cdn.obsess-vr.com/obsess-logo-636466.png';

    return getStoreScenes(storeId)
        .then((res) => {
            const firstObj = res[0] || false;
            const firstSceneImageUrl = firstObj?.cube_map_dir ? `${formURL(firstObj.cube_map_dir)}1k_front.jpg` : OBSESS_GREY_LOGO;

            return {
                storeId,
                thumbnailUrl: firstSceneImageUrl,
            };
        })
        .catch((err) => Promise.reject(err));
};


//export const apiPublishSceneData = (storeId) => makePOSTRequest(`${URLS.PUBLISH_SCENE_DATA}/${storeId}`, {}, storeId);
//http://127.0.0.1:5000/cms/push_objects/6076f2a85f4dbb86ecce304c
//Post with empty data ?
export const apiPublishSceneData = async (storeId) => {
    if (!storeId) return Promise.reject('Missed required parameter');

    const conf = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .post(`${API_URL}/cms/push_objects/${storeId}`, {},  conf)
        // .post(`${API_URL}/cms/push_objects/${storeId}`,   conf)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};
