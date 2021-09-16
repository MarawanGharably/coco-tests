import * as types from '../types/productLibrary';
import {ADD_PRODUCTS_TO_FOLDER} from "../types/productLibrary";

/**
 * Important!
 * Each action call forces the state update
 * Each state update forces re-render
 */
export const setProductLibDataAction = (data) => ({
    type: types.SET_PRODUCT_LIB_DATA,
    payload: data,
});



export const addProductsToFolderAction = (folderId, records=[]) => ({
    type: types.ADD_PRODUCTS_TO_FOLDER,
    payload:{folderId, records},
});


export const setProductsAction = (products) => ({
    type: types.SET_PRODUCTS,
    payload: products,
});

export const setFoldersAction = (folders) => ({
    type: types.SET_FOLDERS,
    payload: folders,
});

export const deleteProductAction = (productId, folderId) => ({
    type: types.DELETE_PRODUCT,
    payload: { productId, folderId },
});


export const deleteFolderAction = (id) => ({
    type: types.DELETE_FOLDER,
    payload: id,
});

export const setModeAction = (data) => ({
    type: types.SET_MODE,
    payload: data,
});


export const setEnabledAction = (payload) => ({
    type: types.SET_ENABLED,
    payload,
});


export const destroyProductLibraryData = () => ({
    type: types.DESTROY_PRODUCT_LIB_DATA
});