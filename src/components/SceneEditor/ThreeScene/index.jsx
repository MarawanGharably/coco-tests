import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createProductMarkerOnEvent, addImageHotspotOnDrop, dragReleaseHotspotAutoSave } from '../../../utils/sceneHelpers';
import Scene, { Hotspot } from '../../../three-js';
import { formURL } from '../../../utils';
import HotspotMarkerUIForm from "../MarkerForms/HotspotMarkerUIForm";
import ImageMarkerUIForm from "../MarkerForms/ImageMarkerUIForm";

/**
 * ThreeScene - is a wrapper for ThreeJS Scene
 * @param storeId
 * @returns {JSX.Element}
 */
const ThreeScene = ({ storeId, sceneObjects, sceneEditorData, productLibrary }) => {
    const { currentSceneId, storeScenes } = sceneEditorData;
    const { mode_slug, products, selectedFolder } = productLibrary;
    const reduxDispatch = useDispatch();
    const [hotspots, setHotspots] = useState(sceneObjects);


    useEffect(()=>setHotspots(sceneObjects),[sceneObjects]);

    //Calc Background config
    const sceneData = Object.values(storeScenes).find((scene) => scene._id.$oid === currentSceneId);
    const bgConf = useMemo(() => {
        if (sceneData) {
            const url = sceneData.cube_map_dir || sceneData.flat_scene_url;
            return {
                isFlatScene: !!sceneData.flat_scene_url,
                backgroundUrl: formURL(url),
            };
        }
    }, [sceneData]);

    const HOTSPOT_TYPES_BY_MODE = {
        product_tagging: 'hotspot_marker',
        product_placement: 'image_marker',
    };
    const selectedHotspotType = HOTSPOT_TYPES_BY_MODE[mode_slug];

    const onMouseDown = (e, marker) => {
        console.log('%c >onMouseDown custom', 'color:blue', { e, marker });
    };

    const onMouseUp = (e, marker, point, scene, intersects, options) => {
        const { isDragEvent } = options;

        if (isDragEvent && marker) {
            dragReleaseHotspotAutoSave(marker, currentSceneId, storeId, reduxDispatch);
        } else if (!isDragEvent) {
            //Open UI
            //TODO: check for marker?.owner?.sceneObject presence
            if (marker && !marker?.owner?.sceneObject) console.error('Prop sceneObject not found - marker.owner.sceneObject', marker);

            if (marker && marker?.owner?.sceneObject) marker.onClick(e);
            //Create marker & record, then Open UI
            else {
                if (mode_slug === 'product_tagging') createProductMarkerOnEvent(e, point, scene);
            }
        }
    };



    const onMouseMove = (e, marker) => {
        // console.log('%c >onMouseMove custom', 'color:blue', {e, marker, options});
    };

    const onDrop = (e, position, cameraRef, maxRenderOrder, scene, setMaxRenderOrder) => {
        addImageHotspotOnDrop(e, position, storeId, currentSceneId, cameraRef, selectedFolder.value, products, maxRenderOrder, scene, setMaxRenderOrder, reduxDispatch);
    };


    return (
        <>
            {currentSceneId && (
                <Scene
                    sceneId={currentSceneId}
                    allowEventsForMarkerTypeOnly={selectedHotspotType}
                    bgConf={bgConf}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    onDrop={onDrop}
                >
                    {placeSceneHotspots(hotspots)}
                </Scene>
            )}
        </>
    );
};

const placeSceneHotspots=(sceneObjects)=>{
    if(!sceneObjects) return false;

    const UIConf={
        'product_image':{
            Component:ImageMarkerUIForm,
            style:{left:'0', top:'3em', background:'none'},
        },
        'product':{
            Component:HotspotMarkerUIForm,
            positionNextToTheElement:true,
            style:{background:'none'},
        }
    }

   return sceneObjects.map((item) => {
        const hotspot_type = item.props.hotspot_type;

        let imageHotspotProps = {};
        if (hotspot_type === 'product_image') {
            imageHotspotProps.scale = item.props.scale;
            imageHotspotProps.renderOrder = item.props.renderOrder;
            imageHotspotProps.imageURL= formURL(item.props?.image.image)
        }

        // Always use unique keys!!!
        return (
            <Hotspot
                key={item._id}
                type={hotspot_type === 'product_image' ? 'image_hotspot' : 'hotspot'}
                collider_transform={item.collider_transform}
                transform={item.transform}
                userData={item}
                UIConfig={UIConf[hotspot_type]}
                {...imageHotspotProps}
            />
        );
    });
}

export default ThreeScene;
