import React, { useState, useEffect } from 'react';
import Loader from '../loader/Loader';
import SceneSideBarItem from '../right-side-bar/SceneSideBarItem';
import { useEditorDataStore, EditorActionEnums } from '../../data-store/editor-data-store/EditorDataStore';
import { useHomePageDataStore, sessionStorageKey } from '../../data-store/home-page-data-store/HomePageDataStore';
import { apiGetAllScenesData } from '../../utils/apiUtils';
import { formURL } from '../../utils/urlHelper';
import RightSideBar from '../right-side-bar/RightSideBar';

const SceneNavigator = () => {
    const [loading, setLoading] = useState(true);


    const [homePageDataStore] = useHomePageDataStore();
    const [editorDataStore, editorDataStoreDispatch] = useEditorDataStore();

    useEffect(() => {
        const sessionStorageStoreId = sessionStorage.getItem(sessionStorageKey.STORE_ID);
        const storeId = homePageDataStore.selectedStoreId || sessionStorageStoreId;

        apiGetAllScenesData(storeId)
            .then((scenesDataResponse) => {
                if (scenesDataResponse.length > 0) {
                    editorDataStoreDispatch({
                        type: EditorActionEnums.SET_SCENE_DATA,
                        payload: { sceneData: scenesDataResponse },
                    });
                }
                setLoading(false);
            });
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
        <RightSideBar cols="1" rowHeight="20em" title="Scenes">
            {loading ? <Loader /> : renderScenes()}
        </RightSideBar>
    );
};

export default SceneNavigator;
