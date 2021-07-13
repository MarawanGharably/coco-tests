export const { API_URL } = process.env;

export const URLS = Object.freeze({
    PROFILE_URL: `${API_URL}/client/profile`,
    CMS_HOTSPOT_URL: `${API_URL}/cms/hotspots`,
    GET_ALL_SCENES_DATA: (storeId) => `${API_URL}/cms/${storeId}/scenes`,
    PUBLISH_SCENE_DATA: `${API_URL}/cms/push_objects`,
});
