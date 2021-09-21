import * as types from '../types/appAlerts';

export const showAppSuccessAlert = (message) => ({
    type: types.SHOW_APP_ALERT,
    payload: { show: true, type: 'success', message},
});

export const showAppErrorAlert = (message) => ({
    type: types.SHOW_APP_ALERT,
    payload: {  show: true, type: 'error', message},
});

export const hideAppAlert = () => ({
    type: types.HIDE_APP_ALERT,
});
