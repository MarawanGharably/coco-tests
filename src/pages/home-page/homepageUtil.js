import { URLS } from '../../utils/urls';
import { formURL } from '../../utils/urlHelper';

const { GET_ALL_SCENES_DATA } = URLS;

export const getFirstSceneImageUrl = async (storeId) => {
    let firstSceneImageUrl = null;
    try {
        const response = await fetch(GET_ALL_SCENES_DATA(storeId), {
            method: 'GET',
            credentials: 'include',
        });
        const statusCode = response.status;
        if (statusCode === 200) {
            const scenesDataResponse = await response.json();
            if (scenesDataResponse.length > 0) {
                firstSceneImageUrl = {
                    storeId,
                    thumbnailUrl: `${formURL(scenesDataResponse[0].cube_map_dir)}1k_front.jpg`,
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
    return firstSceneImageUrl;
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
