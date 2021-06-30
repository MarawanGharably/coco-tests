import * as types from '../types/toast';

export const showMessage = (message, variant) => (dispatch) => {
    return dispatch({ type: types.SHOW_MESSAGE, payload: { message, variant } });
};

export const hideMessage = () => (dispatch) => {
    return dispatch({ type: types.HIDE_MESSAGE });
};

export const setDelay = (delay) => (dispatch) => {
    return dispatch({ type: types.SET_DELAY, payload: delay });
};
