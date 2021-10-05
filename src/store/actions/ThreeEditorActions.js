import * as types from '../types/ThreeEditorActionTypes';



export const setSceneAction = (data) => ({
    type: types.SET_SCENE,
    payload: data,
});

export const setMaxRenderOrderAction = (data) => ({
    type: types.SET_MAX_RENDER_ORDER,
    payload: data,
});