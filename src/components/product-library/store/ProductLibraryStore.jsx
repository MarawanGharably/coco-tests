import React, {
    createContext, useContext, useReducer, useEffect,
} from 'react';
import useAPI from '../hooks/useAPI';
import { useHomePageDataStore } from '../../../data-store/home-page-data-store/HomePageDataStore';
import { GENERAL_LABEL } from './productLibraryLabelEnums';
import {
    SET_LOADING,
    SET_PRODUCTS,
    SET_SELECTED_FOLDER,
    DELETE_PRODUCT,
    DELETE_FOLDER,
    SET_MODE,
} from './productLibraryActionEnums';

import {
    PRODUCT_TAGGING,
} from '../../mode-selector/modeOptions';

const initialState = {
    isLoading: true,
    products: [],
    folders: [],
    selectedFolder: { label: GENERAL_LABEL },
    mode: PRODUCT_TAGGING,
};

const StateContext = createContext(initialState);
const DispatchContext = createContext();
const { Consumer } = StateContext;

const ProductLibraryReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return ({
                ...state,
                isLoading: payload,
            });
        case SET_PRODUCTS:
            return ({
                ...state,
                isLoading: false,
                products: payload.products,
                folders: payload.folders,
                selectedFolder: payload.selectedFolder,
            });
        case SET_SELECTED_FOLDER:
            return ({
                ...state,
                selectedFolder: payload,
            });
        case DELETE_PRODUCT:
            return ({
                ...state,
                products: state.products.filter(({ id }) => id !== payload),
            });
        case DELETE_FOLDER:
            return ({
                ...state,
                products: state.products.filter(({ folderId }) => folderId !== payload),
                folders: state.folders.filter(({ id }) => id !== payload),
                selectedFolder: { label: GENERAL_LABEL },
            });
        case SET_MODE:
            return ({
                ...state,
                mode: payload,
            });
        default:
            console.error(`Action of type ${type} not supported!`);
            return state;
    }
};

const ProductLibraryStore = ({ children }) => {
    const [state, dispatch] = useReducer(ProductLibraryReducer, initialState);
    const { getProducts } = useAPI();
    const [storeState] = useHomePageDataStore();
    const { selectedStoreId } = storeState;

    // After selectedStoreId is present get products from api
    useEffect(() => {
        if (selectedStoreId) {
            getProducts(dispatch);
        }
    }, [selectedStoreId]);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useProductLibrary = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    return [state, dispatch];
};

export {
    ProductLibraryStore,
    useProductLibrary,
    Consumer,
};
