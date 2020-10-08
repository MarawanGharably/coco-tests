import React, { useContext, useReducer, useEffect } from 'react';


const sessionStorageKey = Object.freeze({
    STORE_ID: 'STORE_ID',
});

const initialState = {
    storeData: null,
    storeThumbnails: [],
    selectedStoreId: '',
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext();

const HomePageActionEnums = Object.freeze({
    SET_STORE_DATA: 'SET_STORE_DATA',
    SET_STORE_THUMBNAILS: 'SET_STORE_THUMBNAILS',
    SET_SELECTED_STORE_ID: 'SET_SELECTED_STORE_ID',
});

const {
    SET_STORE_DATA,
    SET_STORE_THUMBNAILS,
    SET_SELECTED_STORE_ID,
} = HomePageActionEnums;

const homePageReducer = (state, action) => {
    const {
        type, payload,
    } = action;

    switch (type) {
        case SET_STORE_DATA:
            return ({
                ...state, storeData: payload.storeData,
            });
        case SET_STORE_THUMBNAILS:
            return ({
                ...state, storeThumbnails: payload.storeThumbnails,
            });
        case SET_SELECTED_STORE_ID:
            return ({
                ...state, selectedStoreId: payload.selectedStoreId,
            });
        default:
            throw new TypeError(`${type} is not a valid action!`);
    }
};

const HomePageDataStore = ({ children }) => {
    const [state, dispatch] = useReducer(homePageReducer, initialState);

    useEffect(() => {
        const sessionStorageStoreId = sessionStorage.getItem(sessionStorageKey.STORE_ID);
        dispatch({
            type: SET_SELECTED_STORE_ID,
            payload: {
                selectedStoreId: sessionStorageStoreId || '',
            },
        });
    }, []);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useHomePageDataStore = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    return [state, dispatch];
};

export {
    HomePageDataStore, useHomePageDataStore, HomePageActionEnums, sessionStorageKey,
};
