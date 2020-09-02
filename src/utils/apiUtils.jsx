import { API_URL } from './envVariables';

const PROFILE_URL = `${API_URL}/client/profile`;

export function apiSubmitProfile(payload) {
    return fetch(PROFILE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
}
