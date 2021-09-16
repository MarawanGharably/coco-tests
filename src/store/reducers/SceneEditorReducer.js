import { SET_CURRENT_SCENE_ID, SET_SCENE_DATA, DESTROY_SCENE_DATA } from '../types/SceneEditorTypes';


const initialState = {
    currentSceneId: '',
    sceneData: [],
};

export default function sceneEditorReducer(state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_SCENE_ID:
            return { ...state, currentSceneId: payload };

        case SET_SCENE_DATA:
            return {...state, sceneData: [...payload]};

        case DESTROY_SCENE_DATA:
            return initialState;
        default:
            return state;
    }
}
