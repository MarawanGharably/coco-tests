import {SHOW_APP_ALERT, HIDE_APP_ALERT} from '../types/appAlerts';

/**
 * {
 *   show: true/false,
 *   type: null, // success/warning/error/info
 *   message: '',
 * }
 */

export default function (state = null, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_APP_ALERT:
            return {...state, ...payload, show:true };

        case HIDE_APP_ALERT:
            return null;

        default:
            return state;
    }
}