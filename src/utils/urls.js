export const { API_URL } = process.env;

export const URLS = Object.freeze({
    CMS_HOTSPOT_URL: `${API_URL}/cms/hotspots`,
    GET_ALL_SCENES_DATA: (storeId) => `${API_URL}/cms/${storeId}/scenes`,
    PUBLISH_SCENE_DATA: `${API_URL}/cms/push_objects`,
});
