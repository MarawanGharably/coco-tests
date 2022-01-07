import axiosApi from "../utils/axiosApi";
import {
  deleteProductAction,
  setProductLibDataAction,
  addProductsToFolderAction
} from "../store/actions/productLibraryActions";




export const setSelectedFolder = (selectedFolder, storeId) => async (dispatch, getState )=> {
  const {productLibrary} = getState();
  const products = productLibrary.products;

  //Products not loaded yet for selected folder? Fetch them
  if(!products[selectedFolder.value] && storeId){
    const foldersRecords= await getProductLibraryFolderRecords(storeId, selectedFolder.value);
    products[selectedFolder.value] = foldersRecords;

    dispatch(setProductLibDataAction({ selectedFolder, products }));
  }else{
    dispatch(setProductLibDataAction({ selectedFolder  }));
  }
};


/**
 * Fetch Data for product placement feature
 * @param storeId
 * @returns { Promise<{folders:[], selectedFolder: {label, value}, products: {}}*}
 */
export const getProductLibrary =  (storeId) => async (dispatch)=> {
  if (!storeId) return Promise.reject('Missed required parameter');

  let products={};

  try{
    const folders = await getProductLibraryFolders(storeId);


    if(folders[0]._id){
      const foldersRecords= await getProductLibraryFolderRecords(storeId, folders[0]._id);
      products[folders[0]._id]=foldersRecords;
    }

    const selectedFolder={
      label:folders[0]['name'],
      value:folders[0]['_id']
    }

    let res={folders, products, selectedFolder };
    console.log('>res', res);
    dispatch(setProductLibDataAction(res));

    return res;
  }catch(err){
    return Promise.reject(err);
  }
};

/**
 * Get List of Product Library folders for selected store
 * @param storeId
 * @returns {Promise [{},...]}
 */
export const getProductLibraryFolders = (storeId) =>{
  if (!storeId) return Promise.reject('Missed required parameter');

  return axiosApi
      .get(`/stores/${storeId}/product_library/folders`)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err));
};



/**
 * Get records associated with the store folder (images, products, etc)
 * @param storeId
 * @param folderId
 * @returns {Promise}
 */
export const getProductLibraryFolderRecords = (storeId, folderId) =>{
  if (!storeId || !folderId) return Promise.reject('Missed required parameter');

  return axiosApi
      .get(`/stores/${storeId}/product_library/folders/${folderId}/list`)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err));
};



export const addProductImageToFolder = (storeId, folderId, data) => (dispatch) => {
  if (!storeId || !folderId) return Promise.reject('Missed required parameter');

  return axiosApi
  .post(`/stores/${storeId}/product_library/folders/${folderId}/add`, data)
  .then((res) => {
    const uploadErrors=[];
    const records =[];

    res.data.map(item=>{
       item.success ? records.push(item.image) : uploadErrors.push(item);
    });

    //Update store
    dispatch(addProductsToFolderAction(folderId, records));

    //Return rejected Promise if any file has upload issue
    if(uploadErrors[0]) return Promise.reject(uploadErrors);

    return records;
  })
  .catch((err) => Promise.reject(err));
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


// export const deleteHotspotProductFolder = (storeId, folderId) => (dispatch) => {
//   if (!storeId || !folderId) return Promise.reject('Missed required parameter');
//
//   return axiosApi
//   .delete(`/stores/${storeId}/product_library/folders/${folderId}`)
//   .then((res) => {
//     dispatch(deleteFolderAction(folderId));
//     return res.data;
//   })
//   .catch((err) => Promise.reject(err));
// };


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
