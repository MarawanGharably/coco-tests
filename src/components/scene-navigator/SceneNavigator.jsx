import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';
import SceneSideBarItem from '../right-side-bar/SceneSideBarItem';
import { apiGetAllScenesData } from '../../utils/apiUtils';
import { formURL } from '../../utils/urlHelper';
import RightSideBar from '../right-side-bar/RightSideBar';
import { SESSION_STORE_ID } from '../../_keys.json';
import { setSceneData, setCurrentSceneID } from '../../store/actions/SceneEditorActions';
import './SceneNavigator.scss';

const SceneNavigator = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { selectedStoreId } = useSelector(state => state['HomePageStore']);
    const { sceneData, currentSceneId } = useSelector(state => state['SceneEditor']);



    useEffect(() => {
        const sessionStorageStoreId = sessionStorage.getItem(SESSION_STORE_ID);
        const storeId =  selectedStoreId || sessionStorageStoreId;
        let mounted = true;

        apiGetAllScenesData(storeId)
            .then((scenesDataResponse) => {
                if (scenesDataResponse.length > 0) {
                    dispatch(setSceneData(scenesDataResponse));
                    dispatch(setCurrentSceneID( scenesDataResponse[0]._id.$oid ));
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
        dispatch(setCurrentSceneID( sceneId ));
    };

    const renderScenes = () => {
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
            <RightSideBar cols="1" rowHeight="15em" title="Scenes">
                {loading ? <Loader /> : renderScenes()}
            </RightSideBar>
        </div>
    );
};

export default SceneNavigator;
