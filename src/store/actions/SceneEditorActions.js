import * as types from '../types/SceneEditorTypes';

export const setSceneData = (data) => ({
    type: types.SET_SCENE_DATA,
    payload: data,
});

export const setCurrentSceneID = (data) => ({
    type: types.SET_CURRENT_SCENE_ID,
    payload: data,
});



export const destroySceneData = () => ({
    type: types.DESTROY_SCENE_DATA,
    payload: false,
});
