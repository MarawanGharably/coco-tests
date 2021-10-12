import React, {useEffect, useRef, useState} from 'react';
import * as THREE from "three";
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { useCollisionManager} from '../../../three-js/_DataManagers';
import { apiGetHotspotsByType } from '../../../APImethods';

import {
    dragReleaseProductHotspotAutoSave,
    createProductMarker,
    addProductImageOnDrop, addNewProductMarker
} from "./utils";
import {PRODUCT_PLACEMENT, PRODUCT_TAGGING} from "../ModeSelector/modeOptions";




const ThreeEditor = dynamic(
    () => import('../../../three-js/three-editor/ThreeEditor').then((mod) => mod.ThreeEditor),
    { ssr: false }
);

/**
 * SceneEditor - is a wrapper for ThreeJS Scene
 * Implement data fetching/prep  and Scene Events here.
 * Keep ThreeEditor free of unrelated to the Scene and ThreeJS computations
 * @param storeId
 * @returns {JSX.Element}
 */
const SceneEditor = ({ storeId }) => {
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const { mode, mode_slug, products, selectedFolder } = useSelector(state => state['productLibrary']);

    //updating sceneObjects will force the whole Scene rerender with flickering
    const [sceneObjects, setSceneObjects] = useState([]);
    const [colliderState, colliderDispatch] = useCollisionManager();
    const sceneRef = useRef(new THREE.Scene());
    const reduxDispatch = useDispatch();




    // console.log('>SceneEditor--', {sceneRef});

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
        console.log('%c> records', 'color:blue', formatted);
        setSceneObjects(formatted);
    };

    useEffect(() => {
        //#1. Fetch Scene Hotspots
        fetchSceneHotspots(['product', 'product_image']);
    }, [currentSceneId]);



    const onMouseDown=(e, marker)=>{
        console.log('%c >onMouseDown custom', 'color:blue', {e, marker});
    }




    const onMouseUp=(e, intersects, options)=>{
        const {isDragEvent} = options;
        const HOTSPOT_TYPES_BY_MODE={
            'product_tagging':'hotspot_marker',
            'product_placement':'image_marker',
        }
        const selectedHotspotType = HOTSPOT_TYPES_BY_MODE[mode_slug];
        const markerIntersection = intersects.find((intersect) => intersect.object.name === 'marker' && intersect.object?.owner?.hotspot_type === selectedHotspotType );
        const marker = markerIntersection?.object;


        console.log('%c >onMouseUp custom', 'color:blue', {marker, intersects, options });




        if (isDragEvent && marker ) {
            dragReleaseProductHotspotAutoSave(marker, currentSceneId, storeId, reduxDispatch);
        }
        else if(!isDragEvent ){
            //Open UI
            if(marker) marker.onClick(e);

            //Create marker & record, then Open UI
            else{
                if (mode === PRODUCT_TAGGING) addNewProductMarker(e, intersects, sceneRef, colliderDispatch);
            }
        }
    }





    const onMouseMove=(e, marker)=>{
        // console.log('%c >onMouseMove custom', 'color:blue', {e, marker, options});
    }


    const onDrop=(e, cameraRef, maxRenderOrder, colliderDispatch,   sceneRef, setMaxRenderOrder)=>{
        addProductImageOnDrop(e, storeId, currentSceneId, cameraRef, selectedFolder.value, products, maxRenderOrder, colliderDispatch,   sceneRef, setMaxRenderOrder);
    }

    return (
        // <CollisionManager>
                <ThreeEditor
                    storeId={storeId}
                    sceneRef={sceneRef}
                    sceneObjects={sceneObjects}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    onDrop={onDrop}
                />
        // </CollisionManager>
    );
};

export default SceneEditor;
