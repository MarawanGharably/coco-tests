import keys from '../../_keys.json';
import { SET_STORE_DATA, SET_SELECTED_STORE_ID, SET_PAGE_HEADER_TITLE } from '../types';

// const isStorePage = window ? window?.location?.pathname?.includes('/create/') : false;

const initialState = {
    stores: null,
    storeThumbnails: [],
    // selectedStoreId: isStorePage ? sessionStorage.getItem(SESSION_STORE_ID) : false,
    selectedStoreId: process.browser   ? sessionStorage.getItem(keys.SESSION_STORE_ID) : false ,
    pageHeaderTitle: '',
};

export default function HomePageReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_STORE_DATA:
            return { ...state, ...payload };

        case SET_SELECTED_STORE_ID:
            return { ...state, selectedStoreId: payload };

        case SET_PAGE_HEADER_TITLE:
            return { ...state, pageHeaderTitle: payload };

        default:
            return state;
    }
}
