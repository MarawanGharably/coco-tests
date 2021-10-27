import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import SceneNavigator from "./SceneNavigator";
import ThreeScene from "./ThreeScene";
import ProductPlacementSidebar from "./ProductPlacementSidebar";
import {apiGetHotspotsByType, getStoreSceneEditorData} from "../../APImethods";
import {destroySceneData, setSceneHotspotsAction} from "../../store/actions/SceneEditorActions";
import {destroyProductLibraryData} from "../../store/actions/productLibraryActions";
import styles from './sceneEditor.module.scss';

export default function SceneEditor({storeId}){
    const dispatch = useDispatch();
    const sceneEditorData = useSelector(state =>state['SceneEditor']);
    const { currentSceneId } = sceneEditorData;

    const productLibrary = useSelector(state =>state['productLibrary']);
    const { isEnabled, mode_slug, deleteProductId } = productLibrary;
    const showSideBar = isEnabled && mode_slug === 'product_placement';

    const [sceneObjects, setSceneObjects] = useState([]);

    useEffect(() => {
        if(!storeId) return;
        else dispatch(getStoreSceneEditorData(storeId))

        return function cleanup(){
            //remove all data loaded for the current store when exiting
            dispatch(destroySceneData());
            dispatch(destroyProductLibraryData());
        }
    }, [storeId]);

    //Image Removed, delete associated colliders (scene objects)
    useEffect(() => {
        const newData = sceneObjects.filter(item=>item.props?.image?._id !== deleteProductId);
        setSceneObjects(newData);
    }, [deleteProductId]);

    useEffect(() => fetchSceneHotspots(['product', 'product_image']), [currentSceneId]);

    const fetchSceneHotspots = async (hotspotTypes = []) => {
        if (!currentSceneId || currentSceneId.length < 5) return;
        setSceneObjects([]);

        const getRoomObjectData = async () => {
            if (Array.isArray(hotspotTypes)) {
                const promises = hotspotTypes.map((hotspotType) => apiGetHotspotsByType(hotspotType, storeId, currentSceneId));
                return Promise.all(promises);
            }

            return apiGetHotspotsByType(hotspotTypes, storeId, currentSceneId);
        };

        const response = await getRoomObjectData();

        const formatted = response.flat().filter((object) => typeof object !== 'string');
        dispatch(setSceneHotspotsAction(currentSceneId, formatted));
        setSceneObjects(formatted);
    };

    return(<Row className={styles['sceneEditor']}>
            <SceneNavigator
                sceneEditor={sceneEditorData}
                className={`${styles.sceneNavigator} ${showSideBar ? styles.withSideBar : ''}`}
            />

            {storeId && (<ThreeScene
                storeId={storeId}
                sceneObjects={sceneObjects}
                sceneEditorData={sceneEditorData}
                productLibrary={productLibrary}
            />)}

            {isEnabled && (<ProductPlacementSidebar
                visible={showSideBar}
                productLibrary={productLibrary}
            />)}

    </Row>)
}