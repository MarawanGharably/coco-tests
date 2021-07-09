export const { API_URL } = process.env;

export const URLS = Object.freeze({
    ADMIN: {
        GET_ALL_CMS_STORES: `${API_URL}/cms/stores`,

    },
    CREATE_STORE_URL: `${API_URL}/store`,
    PROFILE_URL: `${API_URL}/client/profile`,
    CMS_HOTSPOT_URL: `${API_URL}/cms/hotspots`,
    GET_ALL_SCENES_DATA: (storeId) => `${API_URL}/cms/${storeId}/scenes`,
    PUBLISH_SCENE_DATA: `${API_URL}/cms/push_objects`,
});
