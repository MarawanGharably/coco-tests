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


export const updateHotspotAPI =( hotspotId, storeId, sceneId, data, validate=true)=>{
    console.log('>updateHotspotAPI', {hotspotId, storeId, sceneId, data});
    if ( !hotspotId || !storeId || !sceneId || !data) return Promise.reject('Missed required parameter');

    return axiosApi
        .put(`/stores/${storeId}/scenes/${sceneId}/hotspots/${hotspotId}?validate=${validate}`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

// no type
// export const deleteHotspot=(hotspotId,  storeId, sceneId)=>{
export const deleteHotspotAPI=(hotspotId,  storeId, sceneId)=>{
    console.log('>deleteHotspotAPI', {hotspotId, storeId, sceneId});
    if (!storeId || !hotspotId || !sceneId) return Promise.reject('Missed required parameter');

    return axiosApi
        .delete(`/stores/${storeId}/scenes/${sceneId}/hotspots/${hotspotId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

