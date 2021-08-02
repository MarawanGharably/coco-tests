import { URLS } from './urls';

const handleErrorResponses = (resolve, reject, response) => {
    const error = response[0];
    if (error === 'Signature has expired') {
        window.location.href = `${process.env.BASE_PATH || ''}/auth/login`;
    } else {
        reject(response);
    }
};

/**
 *
 * WARNING:
 * use APImethods folder for new methods
 *
 */
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
        case 401: {
            response.json()
                .then((responseJson) => handleErrorResponses(resolve, reject, responseJson));
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
            'Access-Control-Allow-Credentials': 'true',
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



// AUTH APIs
export const apiUserAuthLogout = () => makeGETRequest(URLS.LOGOUT_URL);


// HOTSPOT_APIs
export const apiCreateHotspotByType = (type, storeId, payload) => makePOSTRequest(`${URLS.CMS_HOTSPOT_URL}/${type}`, payload, storeId);
export const apiUpdateHotspotByType = (type, storeId, hotspotId, payload) => makePUTRequest(`${URLS.CMS_HOTSPOT_URL}/${type}/${hotspotId}`, payload, storeId);
export const apiDeleteHotspotByType = (type, storeId, hotspotId) => makeDELETERequest(`${URLS.CMS_HOTSPOT_URL}/${type}/${hotspotId}`, storeId);


// PRODCT PLACEMENT PAGE APIs
export const apiPublishSceneData = (storeId) => makePOSTRequest(`${URLS.PUBLISH_SCENE_DATA}/${storeId}`, {}, storeId);

