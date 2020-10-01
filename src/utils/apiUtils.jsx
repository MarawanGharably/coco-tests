import { URLS } from './urls';

const handleResponse = (resolve, reject, response) => {
    switch (response.status) {
        case 200: {
            resolve(response.json());
            break;
        }
        default: {
            response.json().then((err) => reject(err));
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
