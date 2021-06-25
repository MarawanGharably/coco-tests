import * as types from '../types/productLibrary';

export const setLoadingAction = (isLoading) => ({
    type: types.SET_LOADING,
    payload: isLoading,
});

export const setProductsAction = (products) => ({
    type: types.SET_PRODUCTS,
    payload: products,
});

export const setFoldersAction = (folders) => ({
    type: types.SET_FOLDERS,
    payload: folders,
});

export const deleteProductAction = (productId) => ({
    type: types.DELETE_PRODUCT,
    payload: productId,
});

export const setSelectedFolderAction = (selectedFolder) => ({
    type: types.SET_SELECTED_FOLDER,
    payload: selectedFolder,
});

export const deleteFolderAction = (id) => ({
    type: types.DELETE_FOLDER,
    payload: id,
});

export const setModeAction = (mode) => ({
    type: types.SET_MODE,
    payload: mode,
});

export const setEnabledAction = (isEnabled) => ({
    type: types.SET_ENABLED,
    payload: isEnabled,
});
