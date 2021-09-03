import axiosApi from "../utils/axiosApi";
import {
  deleteFolderAction,
  deleteProductAction,
  setFoldersAction,
  setLoadingAction,
  setSelectedFolderAction
} from "../store/actions/productLibraryActions";


export const getProductLibrary = (storeId, setDefaultSelected=true) => dispatch=> {
  if (!storeId) return Promise.reject('Missed required parameter');

  return axiosApi
  .get(`/stores/${storeId}/product_library`)
  .then((res) => {
    const folders = parseFolders(res.data.folders);
    dispatch(setFoldersAction(folders));
    if (folders.length > 0) {
      setDefaultSelected && dispatch(
        setSelectedFolderAction({
          label:folders[0]['name'],
          value:folders[0]['_id'],
          products: folders[0]['products']
        })
      )
    }
    return { folders };
  })
  .catch((err) => Promise.reject(err));
};


export const addProductImageToFolder = (storeId, folderId, data) => (dispatch) => {
  if (!storeId) return Promise.reject('Missed required parameter');
  dispatch(setLoadingAction(true));

  return axiosApi
  .post(`/stores/${storeId}/product_library/folders/${folderId}/add`, data)
  .then((res) => {
    console.log(
      "=> TODO: parse this response and show appropriate success/error " +
      "messages before closing the dialog. After closing refresh product " +
      "library using getProductLibrary",
      res.data);
    return res.data;
  })
  .catch((err) => Promise.reject(err))
  .finally(() => {
    dispatch(setLoadingAction(false));
  });
};


export const deleteProductImageFromFolder = (storeId, productId, folderId) => (dispatch) => {
  if (!storeId || !productId) return Promise.reject('Missed required parameter');

  return axiosApi
  .delete(`/stores/${storeId}/product_library/folders/product_image/${productId}`)
  .then((res) => {
    dispatch(deleteProductAction(productId, folderId));
    return res.data;
  })
  .catch((err) => Promise.reject(err));
};


export const deleteHotspotProductFolder = (storeId, folderId) => (dispatch) => {
  if (!storeId || !folderId) return Promise.reject('Missed required parameter');

  return axiosApi
  .delete(`/stores/${storeId}/product_library/folders/${folderId}`)
  .then((res) => {
    dispatch(deleteFolderAction(folderId));
    return res.data;
  })
  .catch((err) => Promise.reject(err));
};


/**************** Utils **********************/
export const parseFolders = (folders) => {
  const parsed = folders.map((folder) => ({
    id: folder._id,
    value: folder._id,
    label: folder.name,
    ...folder,
  }));

  return parsed.sort((first, second) => 0 - (first.order > second.order ? -1 : 1));
};