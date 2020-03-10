import React, { createContext, useContext, useReducer } from 'react';

const FormDataActionEnums = {
    SET_FORM_DATA: 'SET_FORM_DATA',
};

export const { SET_FORM_DATA } = FormDataActionEnums;

const initialState = {};
const State = createContext(initialState);
const Dispatch = createContext();

const formDataReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_FORM_DATA:
            return { ...state, ...payload };
        default:
            throw new TypeError(`${type} is not a valid action!`);
    }
};

const FormDataStore = ({ children }) => {
    const [state, dispatch] = useReducer(formDataReducer, initialState);

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>
                {children}
            </Dispatch.Provider>
        </State.Provider>
    );
};

const useFormDataStore = () => {
    const state = useContext(State);
    const dispatch = useContext(Dispatch);

    return [state, dispatch];
};

export { FormDataStore, useFormDataStore };
