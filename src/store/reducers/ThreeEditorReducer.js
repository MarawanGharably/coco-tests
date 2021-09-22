/**
 * Do not connect it to the Redux Store.
 * The data is very heavy and leads to memory overload
 */
import {
    SET_LOADING, SET_MAX_RENDER_ORDER,
    SET_SCENE,
} from "../types/ThreeEditorActionTypes";


export default function ThreeEditorReducer (state, action){
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return ({...state, isLoading: payload });

        case SET_SCENE:
            return ({...state, scene: payload });


        case SET_MAX_RENDER_ORDER:
            return ({...state, maxRenderOrder: payload });

        default:
            return state;
    }
};