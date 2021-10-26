import axiosApi from '../utils/axiosApi';
import { showAppErrorAlert } from '../store/actions/appAlertsActions';

export const apiGetHotspotsByType = (type, storeId, sceneId) => {
    if (!storeId || !type || !sceneId) return Promise.reject('Missed required parameter');

    return axiosApi
        .get(`/stores/${storeId}/scenes/${sceneId}/hotspots/${type}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};

/**
 * Create Hotspot
 * @param type
 * @param storeId
 * @param sceneId
 * @param data={
 *  "type":"HotspotMarker",
 *  "scene":"601c753cc1b4f781a3d1ecc4",
 *  "collider_transform":[],
 *  "props":{
 *      "show_icon":true,
 *       "renderOrder":22,
 *       "scale":3,
 *       "hotspot_type":"product_image",
 *       "image":"612ed293ed7562595020924e"
 *  }
 * }
 * @param validate
 * @returns {Promise}
 */
export const apiCreateHotspotByType = (type, storeId, sceneId, data, validate = true) => {
    if (!storeId || !type || !data) return Promise.reject('Missed required parameter');

    //Format in correct data types
    if (data?.props?.scale) data.props.scale = Number(data.props.scale);
    if (data?.props?.renderOrder) data.props.renderOrder = Number(data.props.renderOrder);

    return axiosApi
        .post(`/stores/${storeId}/scenes/${sceneId}/hotspots/${type}?validate=${validate}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};



export const updateHotspotAPI = (hotspotId, storeId, sceneId, data, validate = true) => (dispatch) => {
    if (!hotspotId || !storeId || !sceneId || !data) return Promise.reject('Missed required parameter');

    //do not send image in request
    delete data.props.image;

    //Format in correct data types
    if (data?.props?.scale) data.props.scale = Number(data.props.scale);
    if (data?.props?.renderOrder) data.props.renderOrder = Number(data.props.renderOrder);

    return axiosApi
        .put(`/stores/${storeId}/scenes/${sceneId}/hotspots/${hotspotId}?validate=${validate}`, data)
        .then((res) => res.data)
        .catch((err) => {
            dispatch(showAppErrorAlert('Server Error'));
            return Promise.reject(err);
        });
};

export const deleteHotspotAPI = (hotspotId, storeId, sceneId) => {
    if (!storeId || !hotspotId || !sceneId) return Promise.reject('Missed required parameter');

    return axiosApi
        .delete(`/stores/${storeId}/scenes/${sceneId}/hotspots/${hotspotId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};
