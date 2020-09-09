import { URLS } from './urls';


const makePOSTRequest = (_url, payload) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    })
        .then((response) => {
            switch (response.status) {
                case 200: {
                    resolve(response.json());
                    break;
                }
                default: {
                    reject(response);
                }
            }
        })
        .catch((err) => {
            reject(err);
        });
});

export const createUser = (payload) => makePOSTRequest(URLS.CREATE_USER_URL, payload);
export const apiSubmitProfile = (payload) => makePOSTRequest(URLS.PROFILE_URL, payload);

const makeGETRequest = (_url) => new Promise((resolve, reject) => {
    fetch(_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        switch (response.status) {
            case 200: {
                resolve(response.json());
                break;
            }
            default: {
                reject(response);
            }
        }
    })
        .catch((err) => reject(err));
});

export const apiGetProfile = () => makeGETRequest(URLS.PROFILE_URL);
