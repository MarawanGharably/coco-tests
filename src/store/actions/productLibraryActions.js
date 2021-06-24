import * as types from '../types/productLibrary';

export const setLoadingAction = (isLoading) => (dispatch) => {
    return dispatch({ type: types.SET_LOADING, payload: isLoading });
};

export const setProductsAction = (products) => (dispatch) => {
    return dispatch({ type: types.SET_PRODUCTS, payload: products });
};

export const setFoldersAction = (folders) => (dispatch) => {
    return dispatch({ type: types.SET_FOLDERS, payload: folders });
};

export const deleteProductAction = (productId) => (dispatch) => {
    return dispatch({ type: types.DELETE_PRODUCT, payload: productId });
};

export const setSelectedFolderAction = (selectedFolder) => ({ type: types.SET_SELECTED_FOLDER, payload: selectedFolder });

export const deleteFolderAction = (id) => (dispatch) => {
    return dispatch({ type: types.DELETE_FOLDER, payload: id });
};

export const setModeAction = (mode) => (dispatch) => {
    return dispatch({ type: types.SET_MODE, payload: mode });
};

export const setEnabledAction = (isEnabled) => (dispatch) => {
    return dispatch({ type: types.SET_ENABLED, payload: isEnabled });
};
