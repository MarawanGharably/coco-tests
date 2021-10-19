import { formURL } from '../utils/urlHelper';
import axiosApi from '../utils/axiosApi';

import {setEnabledAction} from "../store/actions/productLibraryActions";
import {setCurrentSceneID, setSceneData} from "../store/actions/SceneEditorActions";


/**
 * get all stores
 */
export const getStores=(fields=[])=>{
    let storesUrl = `/stores`;
    if (fields?.length > 0) {
        storesUrl = `${storesUrl}?fields=${fields.join(',')}`
    }
    return axiosApi
        .get(storesUrl)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


/**
 * get stores in a user access group
 */
export const getUserStores=()=>{
    return axiosApi
        .get(`/stores/users-stores`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


/**
 * get single store data
 */
export const getStore=(storeId)=>{
    if(!storeId) return Promise.reject(Error('storeId is required parameter'));
    return axiosApi
        .get(`/stores/${storeId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

/**
 * Update store data
 */
export const updateStore=(storeId, data)=>{
    if(!storeId) return Promise.reject(Error('storeId is required parameter'));

    return axiosApi
        .put(`/stores/${storeId}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}




export const getStoreFlags=(storeId, options)=>dispatch=>{
    console.log('>getStoreFlags', { storeId });
    if(!storeId) return Promise.reject('Missed required parameter');
    return axiosApi
        .get(`/stores/${storeId}/features`)
        .then((res) => {
            if(options?.updateStore === 'productLibrary'){
                dispatch(setEnabledAction(res.data['product_library_enabled']));
            }
            return res.data;
        })
        .catch((err) => Promise.reject(err));
}


export const getStoreScenes = (storeId, options) =>dispatch=> {
    if (!storeId) return Promise.reject('Missed required param');

    const conf = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .get(`/stores/${storeId}/scenes`, conf)
        .then((res) => {
            if(options?.updateStore === 'productLibrary' && res.data[0]){
                dispatch(setSceneData(res.data));
                dispatch(setCurrentSceneID(res.data[0]._id.$oid));
            }
            return res.data;
        })
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


export const apiPublishSceneData = async (storeId) => {
    if (!storeId) return Promise.reject('Missed required parameter');

    const conf = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .post(`/stores/${storeId}/push_objects`, {},  conf)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};
