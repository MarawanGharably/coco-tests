import { useSelector } from 'react-redux';
import { useEditorDataStore } from '../../../data-store/editor-data-store/EditorDataStore';
import { apiCreateHotspotByType, apiUpdateHotspotByType, apiDeleteHotspotByType } from '../../../utils/apiUtils';


const HOTSPOT_TYPE = 'product_image';

const useAPI = ({ getTransforms, dispose, updateState }) => {
    const [editorState] = useEditorDataStore();
    const HomePageStore = useSelector(state => state['HomePageStore']);
    const { selectedStoreId } = HomePageStore;
    const { currentSceneId } = editorState;

    const parsePostData = ({
        scale, renderOrder, imageId, folderId,
    }) => {
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

    const updateHotspot = async ({ postData, id }) => {
        try {
            await apiUpdateHotspotByType(
                HOTSPOT_TYPE, selectedStoreId, id, postData,
            );
        } catch (error) {
            console.error(error);
        }
    };

    const createHotspot = async ({ postData }) => {
        try {
            const response = await apiCreateHotspotByType(
                HOTSPOT_TYPE, selectedStoreId, postData,
            );

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

    const deleteHotspot = async (id) => {
        try {
            await apiDeleteHotspotByType(HOTSPOT_TYPE, selectedStoreId, id);

            dispose();
        } catch (err) {
            console.error('Hotspot deletion failed\n', err);
        }
    };

    const handleHotspotChange = async ({
        scale, id, renderOrder, imageId, folderId,
    }) => {
        const postData = parsePostData({
            scale, renderOrder, imageId, folderId,
        });

        if (id) {
            await updateHotspot({ postData, id });
        } else {
            await createHotspot({ postData, dispose });
        }
    };

    return { handleHotspotChange, deleteHotspot };
};

export default useAPI;
