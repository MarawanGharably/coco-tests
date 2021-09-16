import * as types from '../types/toast';

//TODO: the goal/role of actions is to have 0 config exposure on components level

// export const showMessage = (message, variant) => (dispatch) => {
//     return dispatch({ type: types.SHOW_MESSAGE, payload: { message, variant } });
// };

export const showSuccessMessage = (message) => ({
    type: types.SHOW_MESSAGE,
    payload: { message, variant:'success'}
});

export const showErrorMessage = (message) => ({
    type: types.SHOW_MESSAGE,
    payload: { message, variant:'danger'}
});



export const hideMessage = () => (dispatch) => {
    return dispatch({ type: types.HIDE_MESSAGE });
};

export const setDelay = (delay) => (dispatch) => {
    return dispatch({ type: types.SET_DELAY, payload: delay });
};
