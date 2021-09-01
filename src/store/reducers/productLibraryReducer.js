import {
    SET_LOADING,
    SET_PRODUCTS,
    SET_FOLDERS,
    SET_SELECTED_FOLDER,
    DELETE_PRODUCT,
    DELETE_FOLDER,
    SET_MODE,
    SET_ENABLED,
    GENERAL_LABEL,
    PRODUCT_TAGGING,
    DESTROY_PRODUCT_LIB_DATA
} from '../types/productLibrary';

const initialState = {
    isLoading: false,
    isEnabled: null, //keep null as initial value to determine whether data was loaded or not
    products: [],
    folders: [],
    selectedFolder: { label: GENERAL_LABEL },
    mode: PRODUCT_TAGGING,
    mode_slug: 'product_tagging',
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case SET_LOADING:
            return ({ ...state, isLoading: payload });

        case SET_PRODUCTS:
            return ({...state, products: payload });

        case SET_FOLDERS:
            return ({ ...state, folders: payload });

        case SET_SELECTED_FOLDER:
            return ({ ...state, selectedFolder: payload });

        case DELETE_PRODUCT:
            return ({
                ...state,
                products: state.products.filter(({ id }) => id !== payload),
            });

        case DELETE_FOLDER:
            return ({
                ...state,
                products: state.products.filter(({ folderId }) => folderId !== payload),
                folders: state.folders.filter(({ id }) => id !== payload),
                selectedFolder: { label: GENERAL_LABEL },
            });


        case SET_MODE:
            return ({
                ...state,
                mode: payload.label,
                mode_slug: payload.value,
            });

        case SET_ENABLED:
            return ({ ...state, isEnabled: payload });

        case DESTROY_PRODUCT_LIB_DATA:
            return initialState;

        default:
            return state;
    }
}
