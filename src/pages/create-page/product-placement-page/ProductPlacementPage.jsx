import React, { useState, useEffect } from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import RightSideBar from '../../../components/right-side-bar/RightSideBar';
import SceneSideBarItem from '../../../components/right-side-bar/SceneSideBarItem';
import Loader from '../../../components/loader/Loader';
import { apiGetAllScenesData } from '../../../utils/apiUtils';
import { formURL } from '../../../utils/urlHelper';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import { useHomePageDataStore, sessionStorageKey } from '../../../data-store/home-page-data-store/HomePageDataStore';
import { useEditorDataStore, EditorActionEnums } from '../../../data-store/editor-data-store/EditorDataStore';

const ProductPlacementPage = () => {
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
                    selected={currentSceneId === scene._id} // eslint-disable-line
                    sceneClickHandler={sceneClickHandler}
                />
            ));
        }
        return renderSceneData;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="product-placement-page flex full-width">
            <Page
                pageTitle="Product Placement"
                pageSubTitle="Place products approximately and we will fix it during review"
            >
                <PageRow width="80%">
                    <div id="three-editor-container" className="full-width">
                        <HotspotEditor />
                    </div>
                </PageRow>
            </Page>
            <RightSideBar cols="1" rowHeight="20em" title="Scenes">
                {renderScenes()}
            </RightSideBar>
        </div>
    );
};

export default ProductPlacementPage;
