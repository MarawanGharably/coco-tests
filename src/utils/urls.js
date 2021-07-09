export const { API_URL } = process.env;

export const URLS = Object.freeze({
    ADMIN: {
        GET_ALL_CMS_STORES: `${API_URL}/cms/stores`,
        STORE_ACCESS_POLICIES_API: `${API_URL}/admin/access/policy`,
        ADD_USER_TO_STORE_POLICY: `${API_URL}/admin/access/add_user_to_store`,
    },
    CREATE_STORE_URL: `${API_URL}/store`,
    PROFILE_URL: `${API_URL}/client/profile`,
    CMS_HOTSPOT_URL: `${API_URL}/cms/hotspots`,
    GET_ALL_SCENES_DATA: (storeId) => `${API_URL}/cms/${storeId}/scenes`,
    PUBLISH_SCENE_DATA: `${API_URL}/cms/push_objects`,
});
