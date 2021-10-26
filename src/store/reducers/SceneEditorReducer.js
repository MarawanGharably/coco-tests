import {SET_SCENE_EDITOR_DATA, SET_SCENE_HOTSPOTS, SET_CURRENT_SCENE_ID, SET_SCENE_DATA, DESTROY_SCENE_DATA } from '../types/SceneEditorTypes';


const initialState = {
    currentSceneId: '',
    storeScenes: {},
    sceneHotspots: {},
};

export default function sceneEditorReducer(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_SCENE_EDITOR_DATA:
            return  {...state, ...payload};

        case SET_SCENE_HOTSPOTS:
            const id = payload.id;
            return {...state,
                sceneHotspots:{
                    ...state.sceneHotspots,
                            [id]:[...payload.data]
                }};

        case SET_CURRENT_SCENE_ID:
            return { ...state, currentSceneId: payload };

        case DESTROY_SCENE_DATA:
            return initialState;
        default:
            return state;
    }
}
