import React, { createContext, useContext, useReducer } from 'react';


const initialState = {
    colliders: [],
    markers: [],
};

const CollisionState = createContext(initialState);

const CollisionDispatch = createContext();

export const CollisionManagerActionEnums = {
    SET_COLLIDERS: 'SET_COLLIDERS',
    REMOVE_COLLIDERS: 'REMOVE_COLLIDERS',
    CLEAR_COLLIDERS: 'CLEAR_COLLIDERS',
};

const { SET_COLLIDERS, REMOVE_COLLIDERS, CLEAR_COLLIDERS } = CollisionManagerActionEnums;

const CollisionManagerReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_COLLIDERS: {
            return (
                {
                    ...state,
                    colliders: (state.colliders.length !== 0
                        ? [...state.colliders, payload]
                        : [payload]),

                });
        }
        case REMOVE_COLLIDERS:
            return (
                {
                    ...state,
                    colliders: state.colliders.filter((collider) => collider.uuid !== payload),
                });
        case CLEAR_COLLIDERS:
            return (
                {
                    ...state,
                    colliders: [],
                });
        default:
            console.error(`Action of type ${type} not supported!`);
            return state;
    }
};

export const CollisionManager = ({ children }) => {
    const [state, dispatch] = useReducer(CollisionManagerReducer, initialState);

    return (
        <CollisionState.Provider value={state}>
            <CollisionDispatch.Provider value={dispatch}>
                { children }
            </CollisionDispatch.Provider>
        </CollisionState.Provider>
    );
};

export const useCollisionManager = () => {
    const state = useContext(CollisionState);
    const dispatch = useContext(CollisionDispatch);
    return [state, dispatch];
};
