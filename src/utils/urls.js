export const { API_URL } = process.env;

export const URLS = {
    LOGIN_URL: `${API_URL}/auth/login`,
    LOGOUT_URL: `${API_URL}/auth/logout`,
    SET_PASSWORD_URL: `${API_URL}/auth/password`,
    PROFILE_URL: `${API_URL}/client/profile`,
    GET_ALL_STORES_URL: `${API_URL}/client/users/stores`,
    CREATE_STORE_URL: `${API_URL}/store`,
    GET_ALL_CMS_STORES: `${API_URL}/cms/stores`,
    STORE_ACCESS_POLICIES_API: `${API_URL}/admin/access/policy`,
    CREATE_USER_URL: `${API_URL}/admin/create_user`,
    GET_ALL_SCENES_DATA: (storeId) => `${API_URL}/cms/${storeId}/scenes`,

};
