import { URLS } from '../../utils/urls';
import { formURL } from '../../utils/urlHelper';

const { GET_ALL_SCENES_DATA } = URLS;

const OBSESS_GREY_LOGO = 'https://cdn.obsess-vr.com/obsess-logo-636466.png';

// get first image of scenes (from scenes data) to populate homepage thumbnails
const getFirstSceneImageUrl = async (storeId) => {
    let firstSceneImageObject = null;
    try {
        const response = await fetch(GET_ALL_SCENES_DATA(storeId), {
            method: 'GET',
            credentials: 'include',
            headers: { 'ovr-str-id': storeId },
        });
        const statusCode = response.status;
        if (statusCode === 200) {
            const scenesDataResponse = await response.json();
            if (scenesDataResponse.length > 0) {
                // placeholder thumbnail img when there is no cube_map_dir
                // TODO: replace placeholder image w/ store images that don't have cube_map_dir
                const firstSceneImageUrl = scenesDataResponse[0].cube_map_dir
                    ? `${formURL(scenesDataResponse[0].cube_map_dir)}1k_front.jpg`
                    : OBSESS_GREY_LOGO;

                firstSceneImageObject = {
                    storeId,
                    thumbnailUrl: firstSceneImageUrl,
                };
            }
        } else if (statusCode === 401 || statusCode === 404) {
            console.log('there are no scenes in this store'); // eslint-disable-line
        } else {
            throw new Error(response);
        }
    } catch (error) {
        throw new Error(error);
    }
    return firstSceneImageObject;
};

export const getStoreThumbnails = async (storeDataArray) => {
    const thumbnailPromises = [];
    if (storeDataArray.length > 0) {
        for (let i = 0; i < storeDataArray.length; i += 1) {
            const storeId = storeDataArray[i]._id.$oid; // eslint-disable-line
            thumbnailPromises.push(getFirstSceneImageUrl(storeId));
        }
    }
    return Promise.all(thumbnailPromises);
};

// turn storeThumbnail array into a map
export const homepageThumbnailReducer = (storeThumbnails) => {
    const thumbnailMap = {};
    // eslint-disable-next-line
    for (const storeThumbnailInfo of storeThumbnails) {
        if (storeThumbnailInfo && storeThumbnailInfo.thumbnailUrl) {
            const { storeId } = storeThumbnailInfo;
            thumbnailMap[storeId] = storeThumbnailInfo.thumbnailUrl;
        }
    }
    return thumbnailMap;
};
