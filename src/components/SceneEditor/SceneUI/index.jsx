import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { dragReleaseHotspotAutoSave } from '../../../utils/sceneHelpers';
import Scene, { Hotspot } from 'threejs-scene';
import { formURL } from '../../../utils';
import HotspotMarkerUIForm from "../MarkerForms/HotspotMarkerUIForm";
import ImageMarkerUIForm from "../MarkerForms/ImageMarkerUIForm";



//key - mode values
//val - scene object type
const HOTSPOT_TYPES_BY_MODE = {
    product_tagging: 'hotspot_marker',
    product_placement: 'image_marker',
};


/**
 * SceneUI - is a wrapper for ThreeJS Scene
 * @param storeId
 * @returns {JSX.Element}
 */
const SceneUI = ({ storeId, mode, sceneObjects, sceneEditorData, productLibrary }) => {
    const { currentSceneId, storeScenes } = sceneEditorData;
    const {  products, selectedFolder } = productLibrary;
    const reduxDispatch = useDispatch();

    const [mount, setMount] = useState(0);//used to force re-render
    const hotspots = useRef(sceneObjects);


    useEffect(()=>{
        hotspots.current = sceneObjects;
        setMount((prevState)=>prevState + 1 );
        },[sceneObjects, currentSceneId]);


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


    const selectedHotspotType = HOTSPOT_TYPES_BY_MODE[mode];



    const onMouseUp = (e, sceneObject, marker, isDragEvent) => {

        if (isDragEvent && marker) {
            dragReleaseHotspotAutoSave(sceneObject, marker, currentSceneId, storeId, reduxDispatch);
        } else if (!isDragEvent) {
            //Open UI
            //TODO: check for marker?.owner?.sceneObject presence
            if (marker && !marker?.sceneObject) console.error('Prop sceneObject not found - marker.owner.sceneObject', marker);

            //Open marker UI
            if (marker && marker?.sceneObject) marker.onClick(e);

            //Create marker & record, then Open UI
            else {
                if (mode === 'product_tagging') {

                    hotspots.current = [...hotspots.current, {
                        type:'product',
                        hotspot_type:'product',
                        userData:{},
                    }];
                    setMount(new Date().getTime());
                }
            }
        }
    };





    const onDrop = (e, position, maxRenderOrder ) => {
        const folderId = selectedFolder.value;
        const imageId = e.dataTransfer.getData('id');
        const image = products[folderId].find((item) => item._id === imageId);
        const renderOrder = maxRenderOrder;
        const scale = 1;



        hotspots.current = [...hotspots.current, {
            type:'product',
            hotspot_type:'product_image',
            scale,
            renderOrder:renderOrder,
            imageURL:image.image,
            userData:{
                scale,
                renderOrder:renderOrder,
                imageURL:image.image,
                imageId,
            },
        }];
        setMount(new Date().getTime());
    };

    return (
        <>
            {currentSceneId && (
                <Scene
                    sceneId={currentSceneId}
                    allowEventsForMarkerTypeOnly={selectedHotspotType}
                    bgConf={bgConf}
                    onMouseUp={onMouseUp}
                    onDrop={onDrop}
                >
                    {placeSceneHotspots(hotspots.current)}
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

   return sceneObjects.map((item,idx) => {
        const hotspot_type = item?.props?.hotspot_type || item.hotspot_type;

        let imageHotspotProps = {};
        if (hotspot_type === 'product_image') {
            imageHotspotProps.scale = item?.props?.scale || item.scale;
            imageHotspotProps.renderOrder = item?.props?.renderOrder || item.renderOrder;
            imageHotspotProps.imageURL= formURL(item.props?.image?.image || item.imageURL)
        }

        // Always use unique keys!!!
        return (
            <Hotspot
                key={item?._id || idx}
                type={hotspot_type === 'product_image' ? 'image_hotspot' : 'hotspot'}
                collider_transform={item.collider_transform}
                transform={item.transform}
                userData={item?.userData || item}
                UIConfig={UIConf[hotspot_type]}
                {...imageHotspotProps}
            />
        );
    });
}

export default SceneUI;
