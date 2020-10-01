import React, { useState, useEffect } from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import RightSideBar from '../../../components/right-side-bar/RightSideBar';
import SceneSideBarItem from '../../../components/right-side-bar/SceneSideBarItem';
import Loader from '../../../components/loader/Loader';
import { URLS } from '../../../utils/urls';
import { formURL } from '../../../utils/urlHelper';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import { useHomePageDataStore } from '../../../data-store/home-page-data-store/HomePageDataStore';
import { EditorDataStore, useEditorDataStore, EditorActionEnums } from '../../../data-store/editor-data-store/EditorDataStore';

const { GET_ALL_SCENES_DATA } = URLS;

const ProductPlacementPage = () => {
    const [loading, setLoading] = useState(true);
    const [homePageDataStore] = useHomePageDataStore();
    const [editorDataStore, editorDataStoreDispatch] = useEditorDataStore();

    useEffect(() => {
        const getAllScenesData = async () => {
            try {
                setLoading(true);
                const response = await fetch(GET_ALL_SCENES_DATA(homePageDataStore.selectedStoreId), { //eslint-disable-line
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'ovr-str-id': homePageDataStore.selectedStoreId },
                });
                const statusCode = response.status;
                if (statusCode === 200) {
                    const scenesDataResponse = await response.json();
                    if (scenesDataResponse.length > 0) {
                        editorDataStoreDispatch({
                            type: EditorActionEnums.SET_SCENE_DATA,
                            payload: { sceneData: [...scenesDataResponse] },
                        });
                        setLoading(false);
                    }
                } else if (statusCode === 401 || statusCode === 404) {
                    console.log('there are no scenes in this store'); // eslint-disable-line
                } else {
                    throw new Error(response);
                }
                setLoading(false);
            } catch (error) {
                throw new Error(error);
            }
        };

        getAllScenesData();
    }, [editorDataStoreDispatch, homePageDataStore.selectedStoreId]);

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
        <EditorDataStore>
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
        </EditorDataStore>
    );
};

export default ProductPlacementPage;
