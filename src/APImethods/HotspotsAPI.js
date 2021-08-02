import axiosApi from '../utils/axiosApi';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

import {
    setProductsAction,
    setFoldersAction,
    setLoadingAction,
    deleteProductAction,
    deleteFolderAction,
} from '../store/actions/productLibraryActions';

export const getStoreHotspots = (storeId) => {};

export const getHotspotProducts = (storeId) => {
    if (!storeId) return Promise.reject('Missed required parameter');

    const config = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .get(`${API_URL}/cms/${storeId}/product_library`, config)
        .then((res) => {
            return {
                products: parseProducts(res.data.products),
                folders: parseFolders(res.data.folders),
            };
        })
        .catch((err) => Promise.reject(err));
};

export const createHotspotProduct = (storeId, data) => (dispatch) => {
    if (!storeId) return Promise.reject('Missed required parameter');
    dispatch(setLoadingAction(true));

    const config = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .post(`${API_URL}/cms/${storeId}/product_library`, data, config)
        .then((res) => {
            const products = parseProducts(res.data.products);
            const folders = parseFolders(res.data.folders);

            dispatch(setProductsAction(products));
            dispatch(setFoldersAction(folders));

            return {
                products,
                folders,
            };
        })
        .catch((err) => Promise.reject(err))
        .finally(() => {
            dispatch(setLoadingAction(false));
        });
};

export const deleteHotspotProduct = (storeId, productId) => (dispatch) => {
    if (!storeId || !productId) return Promise.reject('Missed required parameter');

    const config = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .delete(`${API_URL}/cms/${storeId}/product_library/${productId}`, config)
        .then((res) => {
            dispatch(deleteProductAction(productId));
            return res.data;
        })
        .catch((err) => Promise.reject(err));
};

export const deleteHotspotProductFolder = (storeId, folderId) => (dispatch) => {
    if (!storeId || !folderId) return Promise.reject('Missed required parameter');

    const config = {
        headers: { 'ovr-str-id': storeId },
    };

    return axiosApi
        .delete(`${API_URL}/cms/${storeId}/product_library/folders/${folderId}`, config)
        .then((res) => {
            dispatch(deleteFolderAction(folderId));
            return res.data;
        })
        .catch((err) => Promise.reject(err));
};


//CMS_HOTSPOT_URL:`${API_URL}/cms/hotspots`
export const apiGetHotspotsByType =(type, storeId, sceneId)=>{
    if (!storeId || !type || !sceneId) return Promise.reject('Missed required parameter');

    const options = {
        headers: {
            'ovr-str-id': storeId,
            'Access-Control-Allow-Credentials': 'true',
        },
    };

    return axiosApi
        .get(`${API_URL}/cms/hotspots/${type}/${sceneId}`, options)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

/******************** Utils ******************************/
const parseProducts = (products) =>
    products.map((product) => ({
        id: product._id.$oid,
        imageUrl: product.image_url,
        folderId: product.folder_id,
        ...product,
    }));

const parseFolders = (folders) => {
    const parsed = folders.map((folder) => ({
        id: folder._id.$oid,
        value: folder._id.$oid,
        label: folder.name,
        ...folder,
    }));

    return parsed.sort((first, second) => 0 - (first.order > second.order ? -1 : 1));
};
