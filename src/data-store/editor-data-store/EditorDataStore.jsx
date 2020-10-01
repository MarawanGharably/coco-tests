import React, { useReducer, useContext } from 'react';

const initialState = {
    currentSceneId: '',
    sceneData: [],
};

const EditorActionEnums = {
    SET_CURRENT_SCENE_ID: 'SET_CURRENT_SCENE_ID',
    SET_SCENE_DATA: 'SET_SCENE_DATA',
};

const {
    SET_CURRENT_SCENE_ID,
    SET_SCENE_DATA,
} = EditorActionEnums;

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext();

const editorReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_SCENE_ID:
            return ({
                ...state, currentSceneId: payload.currentSceneId,
            });
        case SET_SCENE_DATA:
            return ({
                ...state, sceneData: [...payload.sceneData],
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
