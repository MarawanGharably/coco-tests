import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import SceneSideBarItem from '../right-side-bar/SceneSideBarItem';
import { useEditorDataStore, EditorActionEnums } from '../../data-store/editor-data-store/EditorDataStore';
import { apiGetAllScenesData } from '../../utils/apiUtils';
import { formURL } from '../../utils/urlHelper';
import RightSideBar from '../right-side-bar/RightSideBar';
import { SESSION_STORE_ID } from '../../_keys.json';

const SceneNavigator = () => {
    const [loading, setLoading] = useState(true);
    const [editorDataStore, editorDataStoreDispatch] = useEditorDataStore();
    const HomePageStore = useSelector(state => state['HomePageStore']);
    const { selectedStoreId } = HomePageStore;

    useEffect(() => {
        const sessionStorageStoreId = sessionStorage.getItem(SESSION_STORE_ID);
        const storeId =  selectedStoreId || sessionStorageStoreId;
        let mounted = true;

        apiGetAllScenesData(storeId)
            .then((scenesDataResponse) => {
                if (scenesDataResponse.length > 0) {
                    editorDataStoreDispatch({
                        type: EditorActionEnums.SET_SCENE_DATA,
                        payload: { sceneData: scenesDataResponse },
                    });
                }

                if (mounted) {
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, []); //eslint-disable-line

    const sceneClickHandler = (sceneId) => {
        editorDataStoreDispatch({
            type: EditorActionEnums.SET_CURRENT_SCENE_ID,
            payload: { currentSceneId: sceneId },
        });
    };

    const renderScenes = () => {
        const { sceneData, currentSceneId } = editorDataStore;
        let renderSceneData = null;

        if (sceneData) {
            renderSceneData = sceneData.map((scene) => (
                <SceneSideBarItem
                    key={scene._id.$oid} // eslint-disable-line
                    sceneId={scene._id.$oid} // eslint-disable-line
                    sceneName={scene.name}
                    thumbnail={`${formURL(scene.cube_map_dir)}1k_front.jpg`}
                    selected={currentSceneId === scene._id.$oid} // eslint-disable-line
                    sceneClickHandler={sceneClickHandler}
                />
            ));
        }
        return renderSceneData;
    };

    return (
        <div className="scene-navigator">
            <RightSideBar cols="1" rowHeight="20em" title="Scenes">
                {loading ? <Loader /> : renderScenes()}
            </RightSideBar>
        </div>
    );
};

export default SceneNavigator;
