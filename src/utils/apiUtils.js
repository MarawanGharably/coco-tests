import { URLS } from './urls';

const handleResponse = (resolve, reject, response) => {
    switch (response.status) {
        case 200: {
            resolve(response.json());
            break;
        }
        case 201: {
            resolve(response.json());
            break;
        }
        case 403: {
            // Need to redirect to login
            break;
        }
        default: {
            response.json().then((err) => reject(err));
            break;
        }
    }
};

const headers = (storeId = null) => {
    if (storeId) {
        return {
            'Content-Type': 'application/json',
            'ovr-str-id': storeId,
        };
    }
    // need this for cookie to set
    return { 'Content-Type': 'application/json' };
};

const requestOptions = {
    credentials: 'include',
};

const makePOSTRequest = (_url, payload, storeId = null) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'POST',
        headers: headers(storeId),
        ...requestOptions,
        body: JSON.stringify(payload),
    })
        .then((response) => {
            handleResponse(resolve, reject, response);
        })
        .catch((err) => {
            reject(err);
        });
});

const makeGETRequest = (_url, storeId = null) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'GET',
        headers: headers(storeId),
        ...requestOptions,
    }).then((response) => {
        handleResponse(resolve, reject, response);
    })
        .catch((err) => reject(err));
});

const makePUTRequest = (_url, payload, storeId = null) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'PUT',
        headers: headers(storeId),
        ...requestOptions,
        body: JSON.stringify(payload),
    }).then((response) => {
        handleResponse(resolve, reject, response);
    }).catch((err) => {
        reject(err);
    });
});

const makeDELETERequest = (_url, storeId = null) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'DELETE',
        headers: headers(storeId),
        ...requestOptions,
    }).then((response) => {
        handleResponse(resolve, reject, response);
    }).catch((err) => {
        reject(err);
    });
});

// ADMIN APIs
export const apiAdminCreateUser = (payload) => makePOSTRequest(URLS.CREATE_USER_URL, payload);
export const apiAdminGetAllStorePolicies = () => makeGETRequest(URLS.STORE_ACCESS_POLICIES_API);
export const apiGetAllCMSStores = () => makeGETRequest(URLS.GET_ALL_CMS_STORES);
export const apiAdminCreateStorePolicy = (payload) => makePOSTRequest(`${URLS.STORE_ACCESS_POLICIES_API}`, payload);


// AUTH APIs
export const apiUserAuthLogout = () => makeGETRequest(URLS.LOGOUT_URL);

// PROFILE APIs
export const apiSubmitProfile = (payload) => makePOSTRequest(URLS.PROFILE_URL, payload);
export const apiGetProfile = () => makeGETRequest(URLS.PROFILE_URL);

// HOTSPOT_APIs
export const apiGetHotspotsByType = (type, storeId, sceneId) => makeGETRequest(`${URLS.CMS_HOTSPOT_URL}/${type}/${sceneId}`, storeId);
export const apiCreateHotspotByType = (type, storeId, payload) => makePOSTRequest(`${URLS.CMS_HOTSPOT_URL}/${type}`, payload, storeId);
export const apiUpdateHotspotByType = (type, storeId, hotspotId, payload) => makePUTRequest(`${URLS.CMS_HOTSPOT_URL}/${type}/${hotspotId}`, payload, storeId);
export const apiDeleteHotspotByType = (type, storeId, hotspotId) => makeDELETERequest(`${URLS.CMS_HOTSPOT_URL}/${type}/${hotspotId}`, storeId);

// HOMEPAGE APIs
export const apiGetClientStores = () => makeGETRequest(URLS.GET_ALL_STORES_URL);

// PRODCT PLACEMENT PAGE APIs
export const apiGetAllScenesData = (storeId) => makeGETRequest(URLS.GET_ALL_SCENES_DATA(storeId), storeId); // eslint-disable-line
