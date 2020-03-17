import React, { createContext, useContext, useReducer } from 'react';

const Action = Object.freeze({
    SET_KEY_VALUE: 'SET_KEY_VALUE',
});

export const getKeyValueDataStore = (initialState) => {
    const State = createContext(initialState);
    const Dispatch = createContext();

    const reducer = (state, action) => {
        const { type, payload } = action;
        switch (type) {
            case Action.SET_KEY_VALUE:
                return { ...state, ...payload };
            default:
                throw new TypeError(`${type} is not a valid action!`);
        }
    };

    const ContextProvider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        return (
            <State.Provider value={state}>
                <Dispatch.Provider value={dispatch}>
                    {children}
                </Dispatch.Provider>
            </State.Provider>
        );
    };

    const useDataStore = () => {
        const state = useContext(State);
        const dispatch = useContext(Dispatch);
        return [state, dispatch];
    };

    return {
        Action,
        ContextProvider,
        useDataStore
    }
}
