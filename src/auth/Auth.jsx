import React, { createContext, useContext, useReducer } from 'react';

const LOCAL_STORAGE_LOGGED_IN_TIME_STAMP = 'LOCAL_STORAGE_LOGGED_IN_TIME_STAMP';
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const now = new Date();
const timeStampString = localStorage.getItem(LOCAL_STORAGE_LOGGED_IN_TIME_STAMP);
const timeStamp = new Date(timeStampString);
// Not all days have 24hrs (day light savings),
// but we don't care because we only need to loosely compare the time.
const elapsedDays = (now - timeStamp) / MS_PER_DAY;

const initialState = {
    isAuthenticated: elapsedDays > 0 && elapsedDays < 1, // 1 day login persistence
};

const AuthContext = createContext(initialState);
const DispatchContext = createContext();

export const AuthAction = Object.freeze({
    LOGGED_IN: 'LOGGED_IN',
});

const { LOGGED_IN } = AuthAction;

const authReducer = (_, action) => {
    console.log(action);
    const { type } = action;

    switch (type) {
        case LOGGED_IN:
            // It's okay if client time isn't consistent,
            // because we're using this for the same client.
            localStorage.setItem(LOCAL_STORAGE_LOGGED_IN_TIME_STAMP, (new Date()).toISOString());
            return ({
                isAuthenticated: true,
            });
        default:
            throw new TypeError(`${type} is not a valid action!`);
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const state = useContext(AuthContext);
    const dispatch = useContext(DispatchContext);

    return [state, dispatch];
}
