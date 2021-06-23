import axiosApi from "../utils/axiosApi";
const { API_URL } = process.env;
import * as reduxActions from '../store/actions/productLibraryActions';





export const getStoreHotspots=(storeId)=>{

}



//GET_PRODUCT_LIBRARY_URL:`${API_URL}/cms/${storeId}/product_library`
export const getHotspotProducts=(storeId)=>{
    if(!storeId) return Promise.reject('Missed required parameter');

    const config={
        headers:{'ovr-str-id': storeId}
    }
    return axiosApi
        .get(`${API_URL}/cms/${storeId}/product_library`, config)
        .then((res) => {
            res.data.products.map((item, i)=>{
                res.data.products[i]['id'] = item._id.$oid;
                res.data.products[i]['imageUrl'] = item.image_url;
                res.data.products[i]['folderId'] = item.folder_id;
            });

            res.data.folders.map((item, i)=>{
                res.data.folders[i]['id'] = item._id.$oid;
                res.data.folders[i]['value'] = item._id.$oid;
                res.data.folders[i]['label'] = item.name;
            });

            return res.data;
        })
        .catch((err) => Promise.reject(err));
}

export const createHotspotProduct=(storeId, data ) => dispatch => {
    if(!storeId) return Promise.reject('Missed required parameter');
    dispatch(reduxActions.setLoading(true));

    const config={
        headers:{'ovr-str-id': storeId}
    }
    return axiosApi
        .post(`${API_URL}/cms/${storeId}/product_library`, data, config)
        .then((res) => {
            const { products, folders } = res.data;
            res.data.products = parseProducts(products);
            res.data.folders = parseFolders(folders);

            dispatch(reduxActions.setProducts({
                products:res.data.products,
                folders:res.data.folders,
            }));

            return res.data;
        })
        .catch((err) => Promise.reject(err))
        .finally(()=>{
            dispatch(reduxActions.setLoading(false));
        });
}

export const deleteHotspotProduct=(storeId, productId)=> dispatch =>{
    if(!storeId || !productId) return Promise.reject('Missed required parameter');

    const config={
        headers:{'ovr-str-id': storeId}
    }

    return axiosApi
        .delete(`${API_URL}/cms/${storeId}/product_library/${productId}`, config)
        .then((res) => {
            dispatch(reduxActions.deleteProductAction(productId));
            return res.data;
        })
        .catch((err) => Promise.reject(err));
}




export const deleteHotspotProductFolder=(storeId, folderId)=> dispatch =>{
    if(!storeId || !folderId) return Promise.reject('Missed required parameter');

    const config={
        headers:{'ovr-str-id': storeId}
    }

    return axiosApi
        .delete(`${API_URL}/cms/${storeId}/folders/${folderId}`, config)
        .then((res) => {
            dispatch(reduxActions.deleteFolderAction(folderId));
            return res.data;
        })
        .catch((err) => Promise.reject(err));
}

const parseFolders = (folders) => {
    const parsed = folders.map((folder) => ({
        id: folder._id.$oid, //eslint-disable-line
        value: folder._id.$oid, //eslint-disable-line
        label: folder.name,
        order: folder.order,
    }));

    return parsed.sort((first, second) => 0 - (first.order > second.order ? -1 : 1));
};

const parseProducts = (products) => (
    products.map((product) => ({
        id: product._id.$oid, //eslint-disable-line
        width: product.width,
        height: product.height,
        imageUrl: product.image_url,
        folderId: product.folder_id,
    }))
);