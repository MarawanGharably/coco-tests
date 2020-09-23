export const { API_URL } = process.env;

export const URLS = {
    LOGIN_URL: `${API_URL}/auth/login`,
    CREATE_USER_URL: `${API_URL}/auth/create_user`,
    SET_PASSWORD_URL: `${API_URL}/auth/password`,
    PROFILE_URL: `${API_URL}/client/profile`,
    GET_ALL_STORES_URL: `${API_URL}/client/stores`,
    CREATE_STORE_URL: `${API_URL}/store`,
    GET_ALL_CMS_STORES: `${API_URL}/cms/stores`,
    CREATE_STORE_ACCESS_POLICY: `${API_URL}/admin/create-policy/`,
};
