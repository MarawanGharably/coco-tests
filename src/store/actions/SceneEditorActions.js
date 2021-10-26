import * as types from '../types/SceneEditorTypes';


export const setCurrentSceneID = (data) => ({
    type: types.SET_CURRENT_SCENE_ID,
    payload: data,
});

export const setSceneHotspotsAction = (sceneId, data) => ({
    type: types.SET_SCENE_HOTSPOTS,
    payload: {id:sceneId, data },
});



export const destroySceneData = () => ({
    type: types.DESTROY_SCENE_DATA,
    payload: false,
});
