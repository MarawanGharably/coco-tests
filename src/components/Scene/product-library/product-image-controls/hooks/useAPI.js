import { useSelector } from 'react-redux';
import { apiCreateHotspotByType, apiUpdateHotspotByType, apiDeleteHotspotByType } from '../../../../../utils/apiUtils';


const HOTSPOT_TYPE = 'product_image';

const useAPI = ({ getTransforms, dispose, updateState }) => {
    const { currentSceneId } = useSelector(state => state['SceneEditor']);


    const parsePostData = ({ scale, renderOrder, imageId, folderId }) => {
        const transforms = getTransforms();
        const { colliderTransform, visualTransform } = transforms;

        return ({
            type: HOTSPOT_TYPE,
            scene_id: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                renderOrder,
                hotspot_type: HOTSPOT_TYPE,
                scale,
                ...(imageId ? {
                    image_id: imageId,
                } : {}),
                ...(folderId ? {
                    folder_id: folderId,
                } : {}),
            },
        });
    };

    const updateHotspot = async (storeId, { postData, id }) => {
        try {
            await apiUpdateHotspotByType(HOTSPOT_TYPE, storeId, id, postData);
        } catch (error) {
            console.error(error);
        }
    };

    const createHotspot = async (storeId, { postData }) => {
        try {
            const response = await apiCreateHotspotByType(HOTSPOT_TYPE, storeId, postData );

            updateState({
                type: response.props.hotspot_type,
                id: response._id.$oid, //eslint-disable-line
                scale: response.props.scale,
                renderOrder: response.props.renderOrder,
            });
        } catch (error) {
            console.error(error);
            dispose();
        }
    };

    const deleteHotspot = async (storeId, id) => {
        try {
            await apiDeleteHotspotByType(HOTSPOT_TYPE, storeId, id);

            dispose();
        } catch (err) {
            console.error('Hotspot deletion failed\n', err);
        }
    };

    const handleHotspotChange = async ({storeId, scale, id, renderOrder, imageId, folderId}) => {
        const postData = parsePostData({scale, renderOrder, imageId, folderId});

        if (id) {
            await updateHotspot(storeId, { postData, id });
        } else {
            await createHotspot(storeId,{ postData, dispose });
        }
    };

    return { handleHotspotChange, deleteHotspot };
};

export default useAPI;
