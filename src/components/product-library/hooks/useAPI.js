import { useHomePageDataStore } from '../../../data-store/home-page-data-store/HomePageDataStore';
import { GENERAL_LABEL } from '../store/productLibraryLabelEnums';

import {
    apiCreateProduct,
    apiGetProducts,
    apiDeleteProduct,
    apiDeleteFolder,
} from '../../../utils/apiUtils';

import {
    SET_LOADING,
    SET_PRODUCTS,
    DELETE_PRODUCT,
    DELETE_FOLDER,
} from '../store/productLibraryActionEnums';

const useAPI = () => {
    const [{ selectedStoreId }] = useHomePageDataStore();
    const defaultFolder = { label: GENERAL_LABEL };

    const parseProducts = (products) => (
        products.map((product) => ({
            id: product._id.$oid, //eslint-disable-line
            width: product.width,
            height: product.height,
            imageUrl: product.image_url,
            folderId: product.folder_id,
        }))
    );

    const parseFolders = (folders) => {
        const parsed = folders.map((folder) => ({
            id: folder._id.$oid, //eslint-disable-line
            value: folder._id.$oid, //eslint-disable-line
            label: folder.name,
            order: folder.order,
        }));

        return parsed.sort((first, second) => 0 - (first.order > second.order ? -1 : 1));
    };

    const parsePostData = (images, folder) => {
        const folderId = folder.id || 0;
        const folderName = folder.label === GENERAL_LABEL ? '' : folder.label;

        return {
            file_upload: images.map((image) => ({
                content: image.content,
                filename: image.filename,
                remove_background: image.remove_background,
                folder_id: folderId,
                folder_name: folderName,
            })),
        };
    };

    const createProduct = async ({
        dispatch, images, folder, closeDialog,
    }) => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true,
            });

            const postData = parsePostData(images, folder);
            const response = await apiCreateProduct(selectedStoreId, postData);
            const products = parseProducts(response.products);
            const folders = parseFolders(response.folders);
            const productFolder = folders.find(({ label }) => label === folder.label);
            const selectedFolder = productFolder || defaultFolder;

            dispatch({
                type: SET_PRODUCTS,
                payload: {
                    products,
                    folders,
                    selectedFolder,
                },
            });
            closeDialog();
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });

            console.error(error);
        }
    };

    const getProducts = async (dispatch) => {
        try {
            const response = await apiGetProducts(selectedStoreId);
            const products = parseProducts(response.products);
            const folders = parseFolders(response.folders);

            dispatch({
                type: SET_PRODUCTS,
                payload: {
                    products,
                    folders,
                    selectedFolder: defaultFolder,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (dispatch, productId) => {
        try {
            await apiDeleteProduct(selectedStoreId, productId);

            dispatch({
                type: DELETE_PRODUCT,
                payload: productId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteFolder = async (dispatch, folderId) => {
        try {
            await apiDeleteFolder(selectedStoreId, folderId);

            dispatch({
                type: DELETE_FOLDER,
                payload: folderId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        createProduct, getProducts, deleteProduct, deleteFolder,
    };
};

export default useAPI;
