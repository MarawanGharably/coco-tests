import * as types from '../types/productLibrary';

export const setLoading = (isLoading) => {
    return { type: types.SET_LOADING, payload: isLoading };
};

export const setProducts = ({ products, folders }) => {
    return {
        type: types.SET_PRODUCTS,
        payload: { products, folders },
    };
};

export const deleteProductAction = (productId) => (dispatch) => {
    dispatch({ type: types.DELETE_PRODUCT, payload: productId });
};

export const setSelectedFolder = (selectedFolder) => (dispatch) => {
    return dispatch({ type: types.SET_SELECTED_FOLDER, payload: selectedFolder });
};

export const deleteFolderAction = (id) => {
    return { type: types.DELETE_FOLDER, payload: id };
};

export const setMode = (mode) => (dispatch) => {
    return dispatch({ type: types.SET_MODE, payload: mode });
};

export const setEnabledAction = (isEnabled) => (dispatch) => {
    dispatch({ type: types.SET_ENABLED, payload: isEnabled });
};
