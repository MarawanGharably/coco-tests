import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SceneNavigator from "./SceneNavigator";
import SceneUI from "./SceneUI";
import ProductPlacementSidebar from "./Sidebars/ProductPlacementSidebar";
import { getStoreSceneEditorData, getStoreSceneHotspots} from "../../APImethods";
import {destroySceneData} from "../../store/actions/SceneEditorActions";
import {destroyProductLibraryData} from "../../store/actions/productLibraryActions";
import styles from './sceneEditor.module.scss';

export default function SceneEditor({storeId, mode}){
    const dispatch = useDispatch();
    const sceneEditorData = useSelector(state =>state['SceneEditor']);
    const { currentSceneId } = sceneEditorData;

    const productLibrary = useSelector(state =>state['productLibrary']);
    const { isEnabled, deleteProductId } = productLibrary;
    const showSideBar = isEnabled && mode === 'product_placement';

    const [sceneObjects, setSceneObjects] = useState([]);

    //Fetch store scenes
    useEffect(() => {
        if(!storeId) return;
        else dispatch(getStoreSceneEditorData(storeId))

        return function cleanup(){
            //remove all data loaded for the current store when exiting
            dispatch(destroySceneData());
            dispatch(destroyProductLibraryData());
        }
    }, [storeId]);

    //Fetch Hotspots
    useEffect(() => {
        if (!currentSceneId || currentSceneId.length < 5) return;
        setSceneObjects([]);
        getStoreSceneHotspots(storeId, currentSceneId, ['product', 'product_image'])
            .then(res=>{
                setSceneObjects(res);
            }).catch(err=>{
            console.error('API Error', err);
        });
    }, [currentSceneId]);

    //Image Removed, delete associated colliders (scene objects)
    useEffect(() => {
        const newData = sceneObjects.filter(item=>item.props?.image?._id !== deleteProductId);
        setSceneObjects(newData);
    }, [deleteProductId]);






    return(<div className={styles['sceneEditor']} >
            <SceneNavigator
                sceneEditor={sceneEditorData}
                className={`${styles.sceneNavigator} ${showSideBar ? styles.withSideBar : ''}`}
            />

            {storeId  && (<SceneUI
                storeId={storeId}
                mode={mode}
                sceneObjects={sceneObjects}
                sceneEditorData={sceneEditorData}
                productLibrary={productLibrary}
            />)}

            {isEnabled && (<ProductPlacementSidebar
                visible={showSideBar}
                productLibrary={productLibrary}
            />)}

    </div>)
}