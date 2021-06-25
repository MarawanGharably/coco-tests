import { SET_KEY_VALUE } from '../types/KWTypes';

//TODO: this reducer is absolutely unnecessary solution designed for profile page form.

const initialState={
    brandName: '',
    brandWebsite: '',
    brandProductCategory: '',
    brandInstagram: '',
    name: '',
    position: '',
}

export default function KWReducer (state=initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_KEY_VALUE:
            return { ...state, ...payload };
        default:
            return state;
    }
};