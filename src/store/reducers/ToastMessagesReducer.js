import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    SET_DELAY,
    SUCCESS,
} from '../types/toast';

const initialState = {
    message: '',
    show: false,
    delay: 3000,
    variant: SUCCESS,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_MESSAGE:
            return ({
                ...state,
                message: payload.message,
                variant: payload.variant,
                show: true,
            });
        case HIDE_MESSAGE:
            return ({
                ...state,
                show: false,
            });
        case SET_DELAY:
            return ({
                ...state,
                delay: payload,
            });
        default:
            return state;
    }
}
