import {
    SET_PRODUCT_LIB_DATA,
    SET_PRODUCTS,
    ADD_PRODUCTS_TO_FOLDER,
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
    isEnabled: null, //keep null as initial value to determine whether data was loaded or not
    products: [],
    folders: [],
    selectedFolder: null,
    mode: PRODUCT_TAGGING,
    mode_slug: 'product_tagging',
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case SET_PRODUCT_LIB_DATA:
            return ({ ...state, ...payload });

        case ADD_PRODUCTS_TO_FOLDER:

            return {
                ...state,
                products: {...state.products,
                    [payload.folderId]: [...state.products[payload.folderId] || [], ...payload.records ]
                }
            };


        case SET_PRODUCTS:
            return ({...state, products: payload });

        case SET_FOLDERS:
            return ({ ...state, folders: payload });

        // case SET_SELECTED_FOLDER:
        //     return ({ ...state, selectedFolder: payload });

        case DELETE_PRODUCT:
            const { productId, folderId } = payload;
            let selectedFolderUpdate = state.selectedFolder;
            selectedFolderUpdate.products = selectedFolderUpdate.products.filter((item) => item._id !== productId);
            let foldersUpdate = state.folders.map((folder) => {
                if (folder._id === folderId) {

                    folder.products = selectedFolderUpdate.products;
                }
                return folder;
            });

            return ({
                ...state,
                selectedFolder: selectedFolderUpdate,
                folders: foldersUpdate
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
