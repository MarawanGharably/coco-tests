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

export const deleteProductAction = (productId, folderId) => ({
    type: types.DELETE_PRODUCT,
    payload: { productId, folderId },
});

export const setSelectedFolderAction = (selectedFolder) => ({
    type: types.SET_SELECTED_FOLDER,
    payload: selectedFolder,
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