import * as types from '../types/KWTypes';

export const setKW = (data) => ({
    type: types.SET_KEY_VALUE,
    payload: data,
});