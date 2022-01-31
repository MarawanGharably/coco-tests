import axiosApi from '../utils/axiosApi';
import { setEnabledAction } from '../store/actions/productLibraryActions';
import * as types from '../store/types/SceneEditorTypes';
import { getProductLibrary } from './ProductLibraryAPI';
import { apiGetHotspotsByType } from './HotspotsAPI';
import { setSceneHotspotsAction } from '../store/actions/SceneEditorActions';

/**
 * get all stores
 */
export const getStores = (fields = []) => {
	let storesUrl = `/stores`;
	if (fields?.length > 0) {
		storesUrl = `${storesUrl}?fields=${fields.join(',')}`;
	}
	return axiosApi
		.get(storesUrl)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

/**
 * GET Store Data
 */
export const getStore = (storeId) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.get(`/stores/${storeId}`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

/**
 * Update Store Data
 */
export const updateStore = (storeId, data) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));

	return axiosApi
		.put(`/stores/${storeId}`, data)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

/**
 * GET Store Info
 */
export const getStoreInfo = (storeId) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.get(`/stores/${storeId}/storeinfo`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

/**
 * Update Store Info
 */
export const updateStoreInfo = (storeId, data) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));

	return axiosApi
		.put(`/stores/${storeId}/storeinfo`, data)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

export const getStoreFlags = (storeId, options) => (dispatch) => {
	// console.log('>getStoreFlags', { storeId });
	if (!storeId) return Promise.reject('Missed required parameter');
	return axiosApi
		.get(`/stores/${storeId}/features`)
		.then((res) => {
			if (options?.updateStore === 'productLibrary') {
				dispatch(
					setEnabledAction({
						storeId,
						isEnabled: res.data['product_library_enabled'],
					}),
				);
			}
			return res.data;
		})
		.catch((err) => Promise.reject(err));
};

export const getStoreScenes = (storeId, options) => (dispatch) => {
	if (!storeId) return Promise.reject('Missed required param');

	const conf = {
		headers: { 'ovr-str-id': storeId },
	};

	return axiosApi
		.get(`/stores/${storeId}/scenes`, conf)
		.then((res) => {
			if (options?.updateStore === 'SceneEditor' && res.data[0]) {
				const sceneObject = res.data.reduce(
					(acc, curr) => ({ ...acc, [curr._id.$oid]: curr }),
					{},
				);

				dispatch({
					type: types.SET_SCENE_EDITOR_DATA,
					payload: {
						currentSceneId: res.data[0]._id.$oid,
						storeScenes: sceneObject,
					},
				});
			}
			return res.data;
		})
		.catch((err) => Promise.reject(err));
};

export const getStoreSceneEditorData = (storeID) => (dispatch) => {
	if (!storeID) return Promise.reject('Missed required param');

	//1. Fetch Store configs
	dispatch(getStoreFlags(storeID, { updateStore: 'productLibrary' }))
		.then((res) => {
			const isEnabled = !!res['product_library_enabled'];
			if (isEnabled) dispatch(getProductLibrary(storeID));
		})
		.catch((err) => {});

	//2. Fetch Store Scenes
	dispatch(getStoreScenes(storeID, { updateStore: 'SceneEditor' }));
};

export const getStoreSceneHotspots = async (storeId, currentSceneId, hotspotTypes = []) => {
	if (!storeId || !currentSceneId) return Promise.reject('Missed required param');

	const getRoomObjectData = async () => {
		if (Array.isArray(hotspotTypes)) {
			const promises = hotspotTypes.map((hotspotType) =>
				apiGetHotspotsByType(hotspotType, storeId, currentSceneId),
			);
			return Promise.all(promises);
		}

		return apiGetHotspotsByType(hotspotTypes, storeId, currentSceneId);
	};

	return getRoomObjectData()
		.then((res) => {
			return res.flat().filter((object) => typeof object !== 'string');
		})
		.catch((err) => Promise.reject(err));
};

/**
 * Get store General data
 */
export const getStoreGeneralData = (storeId) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.get(`/stores/${storeId}/general`)
		.then((res) => {
			const data = res.data.general;
			data._id = res.data._id;
			return data;
		})
		.catch((err) => Promise.reject(err));
};

/**
 * GET Store Styling
 */
export const getStoreStylingData = (storeId) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.get(`/stores/${storeId}/styling`)
		.then((res) => {
			const data = res.data;
			data._id = res.data._id;

			return data;
		})
		.catch((err) => Promise.reject(err));
};

/**
 * Get store locales
 */
export const getStoreLocale = (storeId) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.get(`/stores/${storeId}/locales`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

/**
 * Update store locales
 */
export const updateStoreLocales = (storeId, data) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.put(`/stores/${storeId}/locales`, data)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err.response));
};


/**
 * Get store fonts
 */

export const getStoreFonts = (storeId) => {
    if (!storeId) return Promise.reject(Error("storeId is required parameter"));
    return axiosApi
        .get(`/stores/${storeId}/fonts`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
}

/**
 * Update store fonts
 */
 export const updateStoreFonts = (storeId, data) => {
    if (!storeId) return Promise.reject(Error("storeId is required parameter"));
    return axiosApi
        .put(`/stores/${storeId}/fonts`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err.response));
};


/**
 * Get store icons
 */
export const getStoreIcons = (storeId) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));
	return axiosApi
		.get(`/stores/${storeId}/icons`)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};

/**
 * Update store icons
 * data: {} - Store.styling.icon fields & values
 * filesToUpload :[] - list of files to upload. Store.styling.store_icon_files will be populated
 */
export const updateStoreIcons = (storeId, data={}, filesToUpload=[]) => {
	if (!storeId) return Promise.reject(Error('storeId is required parameter'));


	//remove unnecessary fields from payload
	filesToUpload.map(item=>{
		delete item.filename;
	});


	return axiosApi
		.put(`/stores/${storeId}/icons`, {
			icons:data,
			store_icon_files:filesToUpload
		})
		.then((res) => res.data)
		.catch((err) => Promise.reject(err.response));
};