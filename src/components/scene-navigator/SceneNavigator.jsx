import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';
import SceneSideBarItem from '../right-side-bar/SceneSideBarItem';
import { formURL } from '../../utils/urlHelper';
import RightSideBar from '../right-side-bar/RightSideBar';
import keys from '../../_keys.json';
import { setSceneData, setCurrentSceneID } from '../../store/actions/SceneEditorActions';
import styles from './SceneNavigator.module.scss';
import { getStoreScenes } from '../../APImethods/StoreAPI';

const SceneNavigator = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { selectedStoreId } = useSelector(state => state['HomePageStore']);
    const { sceneData, currentSceneId } = useSelector(state => state['SceneEditor']);



    useEffect(() => {
        const sessionStorageStoreId = sessionStorage.getItem(keys.SESSION_STORE_ID);
        const storeId =  selectedStoreId || sessionStorageStoreId;
        let mounted = true;

        getStoreScenes(storeId)
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
        if (sceneId !== currentSceneId) {
            dispatch(setCurrentSceneID(sceneId));
        }
    };

    const thumbnail = (scene) => {
        if (scene.cube_map_dir) {
            return `${formURL(scene.cube_map_dir)}1k_front.jpg`;
        }

        if (scene.flat_scene_url) {
            return formURL(scene.flat_scene_url);
        }

        return '';
    };

    const renderScenes = () => {
        let renderSceneData = null;

        if (sceneData) {
            renderSceneData = sceneData.map((scene) => (
                <SceneSideBarItem
                    key={scene._id.$oid} // eslint-disable-line
                    sceneId={scene._id.$oid} // eslint-disable-line
                    sceneName={scene.name}
                    thumbnail={thumbnail(scene)}
                    selected={currentSceneId === scene._id.$oid} // eslint-disable-line
                    sceneClickHandler={sceneClickHandler}
                />
            ));
        }
        return renderSceneData;
    };

    return (
        <div className={styles["scene-navigator"]}>
            <RightSideBar title="Scenes">
                {loading ? <Loader /> : renderScenes()}
            </RightSideBar>
        </div>
    );
};

export default SceneNavigator;
