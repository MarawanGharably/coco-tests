import { createContext, useContext, useReducer } from 'react';

const initialState = {
    isAuthenticated: false,
};

const AuthContext = createContext(initialState);
const DispatchContext = createContext();

export const AuthAction = Object.freeze({
    LOGGED_IN: 'LOGGED_IN',
});

const { LOGGED_IN } = AuthAction;

const authReducer = (_, action) => {
    const { type } = action;
    console.log(action);
    switch (type) {
        case LOGGED_IN:
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
