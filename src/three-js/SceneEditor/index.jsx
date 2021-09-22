import React, {useEffect, useRef, useState} from 'react';
import * as THREE from "three";
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import {Background, ColliderSphere} from '../three-background';
import { useUIManager, useCollisionManager} from '../_contextDataManagers';
import { apiGetHotspotsByType } from '../../APImethods';

import {
    dragReleaseProductHotspotAutoSave,
    openProductUI,
    resetUI
} from "./utils";




const ThreeEditor = dynamic(
    () => import('../three-editor/ThreeEditor').then((mod) => mod.ThreeEditor),
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
    const { mode } = useSelector(state => state['productLibrary']);
    const [sceneObjects, setSceneObjects] = useState([]);
    const [UIState, UIDispatch] = useUIManager();
    const [colliderState, colliderDispatch] = useCollisionManager();
    const sceneRef = useRef(new THREE.Scene());

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
        setSceneObjects(formatted);
    };

    useEffect(() => {
        //#1. Fetch Scene Hotspots
        fetchSceneHotspots(['product', 'product_image']);
    }, [currentSceneId]);



    const onMouseDown=(e, marker)=>{
        console.log('%c >onMouseDown custom', 'color:blue', {e, marker});
    }




    const onMouseUp=(e, marker, options)=>{
        const {DESKTOP_THRESHOLD, dragDistance, isMarkerClicked, intersects,} = options;
        console.log('%c >onMouseUp custom', 'color:blue', {e, marker, options});

        if (marker) resetUI(marker, UIState, UIDispatch);

        if (dragDistance > DESKTOP_THRESHOLD) {
            if (isMarkerClicked) {
                dragReleaseProductHotspotAutoSave(marker, currentSceneId, storeId);
            }
        }else{
            openProductUI(marker, isMarkerClicked, intersects, mode, sceneRef, UIState, UIDispatch, colliderDispatch);
        }
    }


    const onMouseMove=(e, marker, options)=>{
        const { isMarkerClicked, mousePosition } = options;
        // console.log('%c >onMouseMove custom', 'color:blue', {e, marker, options});
    }

    return (
        // <CollisionManager>
        //     <UIManager>
                <ThreeEditor sceneRef={sceneRef} storeId={storeId} sceneObjects={sceneObjects}
                             onMouseDown={onMouseDown}
                             onMouseUp={onMouseUp}
                             onMouseMove={onMouseMove}
                >
                    <ColliderSphere />
                    <Background />
                </ThreeEditor>
            // </UIManager>
        // </CollisionManager>
    );
};

export default SceneEditor;
