import axiosApi from '../utils/axiosApi';
import {setEnabledAction} from "../store/actions/productLibraryActions";
import * as types from '../store/types/SceneEditorTypes';
import {getProductLibrary} from "./ProductLibraryAPI";

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


export const getStoreScenes = (storeId, options) => dispatch => {
    if (!storeId) return Promise.reject('Missed required param');

    const conf = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .get(`/stores/${storeId}/scenes`, conf)
        .then((res) => {
            if(options?.updateStore === 'SceneEditor' && res.data[0]){
                const sceneObject = res.data.reduce((acc, curr)=>({ ...acc, [curr._id.$oid]: curr}), {});

                dispatch({type:types.SET_SCENE_EDITOR_DATA, payload:{
                        currentSceneId:res.data[0]._id.$oid,
                        storeScenes:sceneObject
                    }});
            }
            return res.data;
        })
        .catch((err) => Promise.reject(err));
};


export const getStoreSceneEditorData=(storeID)=>dispatch=>{
    if (!storeID) return Promise.reject('Missed required param');

    //1. Fetch Store configs
    dispatch(getStoreFlags(storeID, {updateStore:'productLibrary'}))
        .then(res=>{
            const isEnabled = !!res['product_library_enabled'];
            if (isEnabled) dispatch(getProductLibrary(storeID));
        }).catch(err=>{});

    //2. Fetch Store Scenes
    dispatch(getStoreScenes(storeID, {updateStore:'SceneEditor'}));
}