import React, { useReducer, useContext } from 'react';

const initialState = {
    sceneId: null,
    currentlySelected: 0,
};

const EditorActionEnums = {
    SET_CURRENTLY_SELECTED: 'SET_CURRENTLY_SELECTED',
};

const { SET_CURRENTLY_SELECTED } = EditorActionEnums;

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext();

const editorReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENTLY_SELECTED:
            return ({
                ...state, ...payload,
            });
        default:
            throw new TypeError(`${type} is not a valid action!`);
    }
};

const EditorDataStore = ({ children }) => {
    const [state, dispatch] = useReducer(editorReducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useEditorDataStore = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    return [state, dispatch];
};

export { EditorActionEnums, EditorDataStore, useEditorDataStore };
