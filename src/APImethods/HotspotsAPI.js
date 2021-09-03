import axiosApi from '../utils/axiosApi';


export const apiGetHotspotsByType =(type, storeId, sceneId)=>{
    if (!storeId || !type || !sceneId) return Promise.reject('Missed required parameter');

    return axiosApi
        .get(`/stores/${storeId}/scenes/${sceneId}/hotspots/${type}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


export const apiCreateHotspotByType=(type, storeId, sceneId, data, validate=true )=>{
    if (!storeId || !type || !data) return Promise.reject('Missed required parameter');

    return axiosApi
        .post(`/stores/${storeId}/scenes/${sceneId}/hotspots/${type}?validate=${validate}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

export const apiUpdateHotspotByType =(type, storeId, sceneId, hotspotId, data)=>{
    if (!storeId || !type || !hotspotId || !data) return Promise.reject('Missed required parameter');

    return axiosApi
        .put(`/stores/${storeId}/scenes/${sceneId}/hotspots/${type}/${hotspotId}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}


export const apiDeleteHotspotByType=(type, storeId, sceneId, hotspotId)=>{
    if (!storeId || !type || !hotspotId ) return Promise.reject('Missed required parameter');

    return axiosApi
        .delete(`/stores/${storeId}/scenes/${sceneId}/hotspots/${type}/${hotspotId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

