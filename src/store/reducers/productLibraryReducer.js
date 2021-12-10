import {
    SET_PRODUCT_LIB_DATA,
    SET_PRODUCTS,
    ADD_PRODUCTS_TO_FOLDER,
    SET_FOLDERS,
    DELETE_PRODUCT,
    DELETE_FOLDER,
    SET_ENABLED,
    GENERAL_LABEL,
    RESET_DELETE_PRODUCT_ID,
    DESTROY_PRODUCT_LIB_DATA,
} from '../types/productLibrary';

const initialState = {
    isEnabled: null, //keep null as initial value to determine whether data was loaded or not
    products: [],
    folders: [],
    selectedFolder: null,
    deleteProductId:null //ThreeEditor will track this prop to remove hotspot/s. NULL by default
};



//TODO: folder related functionality will be removed from  store.productLibrary


export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // update multiple props
        case SET_PRODUCT_LIB_DATA:
            return { ...state, ...payload };

        case SET_FOLDERS:
            return { ...state, folders: payload };

        case DELETE_FOLDER:
            return {
                ...state,
                products: state.products.filter(({ folderId }) => folderId !== payload),
                folders: state.folders.filter(({ id }) => id !== payload),
                selectedFolder: { label: GENERAL_LABEL },
            };


        case SET_PRODUCTS:
            return { ...state, products: payload };

        case ADD_PRODUCTS_TO_FOLDER:
            return {
                ...state,
                products: { ...state.products,
                    [payload.folderId]: [...(state.products[payload.folderId] || []), ...payload.records]
                },
            };

        case DELETE_PRODUCT:
            const { productId, folderId } = payload;

            state.products[folderId] = state.products[folderId].filter((item) => item._id != productId);
            return {
                ...state,
                products: { ...state.products },
                deleteProductId:productId //required to update ThreeEditor
            };

        case RESET_DELETE_PRODUCT_ID:
            return {...state, deleteProductId:null};

        case SET_ENABLED:
            return { ...state, isEnabled: payload };

        case DESTROY_PRODUCT_LIB_DATA:
            return initialState;


        default:
            return state;
    }
}
