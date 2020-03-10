import React, { useContext, useReducer } from 'react';

const initialState = {
    storeId: '',
    buildStage: '',
    thumbnailUrl: '',
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext();

const HomePageActionEnums = Object.freeze({
    RECEIVE_HOMEPAGE_DATA: 'RECEIVE_HOMEPAGE_DATA',
});

const { RECEIVE_HOMEPAGE_DATA } = HomePageActionEnums;

const homePageReducer = (state, action) => {
    const {
        type, payload,
    } = action;

    switch (type) {
        case RECEIVE_HOMEPAGE_DATA:
            return ({
                ...state, ...payload,
            });
        default:
            throw new TypeError(`${type} is not a valid action!`);
    }
};

const HomePageDataStore = ({ children }) => {
    const [state, dispatch] = useReducer(homePageReducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useHomePageData = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    return [state, dispatch];
};

export { HomePageDataStore, useHomePageData, HomePageActionEnums };
