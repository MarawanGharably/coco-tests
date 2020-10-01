import { URLS } from './urls';

const handleResponse = (resolve, reject, response) => {
    switch (response.status) {
        case 200: {
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

const headers = {
    // need this for cookie to set
    'Content-Type': 'application/json',
};

const requestOptions = {
    credentials: 'include',
};

const makePOSTRequest = (_url, payload) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'POST',
        headers,
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

const makeGETRequest = (_url) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'GET',
        headers,
        ...requestOptions,
    }).then((response) => {
        handleResponse(resolve, reject, response);
    })
        .catch((err) => reject(err));
});

const makePUTRequest = (_url, payload) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'PUT',
        headers,
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

const makeDELETERequest = (_url) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'DELETE',
        headers,
        ...requestOptions,
    })
        .then((response) => {
            handleResponse(resolve, reject, response);
        })
        .catch((err) => {
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
export const apiGetHotspotsByType = (type, sceneId) => makeGETRequest(`${URLS.CMS_HOTSPOT_URL}/${type}/${sceneId}`);
export const apiCreateHotspotByType = (type, payload) => makePOSTRequest(`${URL.CMS_HOTSPOT_URL}/${type}`, payload);
export const apiUpdateHotspotByType = (type, hotspotId, payload) => makePUTRequest(`${URL.CMS_HOTSPOT_URL}/${type}/${hotspotId}`, payload);
export const apiDeleteHotspotByType = (type, hotspotId) => makeDELETERequest(`${URL.CMS_HOTSPOT_URL}/${type}/${hotspotId}`);
