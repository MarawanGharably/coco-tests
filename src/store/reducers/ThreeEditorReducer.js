/**
 * Do not connect it to the Redux Store.
 * The data is very heavy and leads to memory overload
 */
import {
    CLEAR_UPDATE_LIST,
    SET_LOADING, SET_MAX_RENDER_ORDER,
    SET_SCENE,
    SET_UPDATE_LIST
} from "../types/ThreeEditorActionTypes";


export default function ThreeEditorReducer (state, action){
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return ({...state, isLoading: payload });

        case SET_SCENE:
            return ({...state, scene: payload });

        case SET_UPDATE_LIST:
            return ({...state, updateList: [...state.updateList, ...payload] });

        case CLEAR_UPDATE_LIST:
            return ({ ...state, updateList: [] });

        case SET_MAX_RENDER_ORDER:
            return ({...state, maxRenderOrder: payload });

        default:
            return state;
    }
};