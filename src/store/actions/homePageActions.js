import * as types from '../types/homePageTypes';
import keys from '../../_keys.json';

export const setStoreData = (data) => ({
    type: types.SET_STORE_DATA,
    payload: data,
});

export const setSelectedStoreID = (storeId) => {
    sessionStorage.setItem(keys.SESSION_STORE_ID, storeId);
    return { type: types.SET_SELECTED_STORE_ID, payload: storeId };
};

export const setPageHeaderTitle = (title = '') => ({
    type: types.SET_PAGE_HEADER_TITLE,
    payload: title,
});
