import { formURL } from '../utils/urlHelper';
import axiosApi from '../utils/axiosApi';
const { API_URL } = process.env;

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
        //api endpoint used at main page
        // OLD route: .get(`${API_URL}/client/users/stores`)
        .get(`${API_URL}/stores/users-stores`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


/**
 * get single store data
 */
export const getStore=(storeId)=>{}


const OBSESS_GREY_LOGO = 'https://cdn.obsess-vr.com/obsess-logo-636466.png';

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


const getStoreScenes = (storeId) => {
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

export const getStoreThumbnails = async (storesArray) => {
    const thumbnailPromises = [];
    if (storesArray.length > 0) {
        for (let i = 0; i < storesArray.length; i += 1) {
            const storeId = storesArray[i]._id.$oid; // eslint-disable-line
            thumbnailPromises.push(getFirstSceneImageUrl(storeId));
        }
    }

    return Promise.all(thumbnailPromises);
};
