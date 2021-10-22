import React from 'react';
import { useDispatch } from 'react-redux';
import {dragReleaseHotspotAutoSave, createProductMarkerOnEvent, addImageHotspotOnDrop} from "./utils";
import ThreeEditor, { Hotspot } from '../../../three-js';




/**
 * SceneEditor - is a wrapper for ThreeJS Scene
 * Implement data fetching/prep  and Scene Events here.
 * Keep ThreeEditor free of unrelated to the Scene and ThreeJS computations
 * @param storeId
 * @returns {JSX.Element}
 */
const SceneEditor =  ({ storeId, sceneObjects, sceneEditorData, productLibrary }) => {
    const { currentSceneId, sceneData:sceneEditorRecords } = sceneEditorData;
    const { mode, mode_slug, products, selectedFolder } = productLibrary;
    const reduxDispatch = useDispatch();


    const HOTSPOT_TYPES_BY_MODE={
        'product_tagging':'hotspot_marker',
        'product_placement':'image_marker',
    }
    const selectedHotspotType = HOTSPOT_TYPES_BY_MODE[mode_slug];


    const onMouseDown=(e, marker)=>{
        console.log('%c >onMouseDown custom', 'color:blue', {e, marker});
    }




    const onMouseUp=(e, marker, scene, intersects, options)=>{
        const {isDragEvent} = options;
        console.log('%c >onMouseUp custom', 'color:blue', {marker, intersects, options });



        if (isDragEvent && marker ) {
            dragReleaseHotspotAutoSave(marker, currentSceneId, storeId, reduxDispatch);
        }
        else if(!isDragEvent ){
            //Open UI
            //TODO: check for marker?.owner?.sceneObject presence
            if(marker && !marker?.owner?.sceneObject) console.error('Prop sceneObject not found - marker.owner.sceneObject', marker );


            if(marker && marker?.owner?.sceneObject) marker.onClick(e);

            //Create marker & record, then Open UI
            else{
                if (mode_slug === 'product_tagging') createProductMarkerOnEvent(e, intersects, scene);
            }
        }
    }





    const onMouseMove=(e, marker, isMarkerClicked)=>{
        // console.log('%c >onMouseMove custom', 'color:blue', {e, marker, options});
    }


    const onDrop=(e, cameraRef, maxRenderOrder,  scene, setMaxRenderOrder)=>{
        addImageHotspotOnDrop(e, storeId, currentSceneId, cameraRef, selectedFolder.value, products, maxRenderOrder,  scene, setMaxRenderOrder);
    }

    const sceneData = sceneEditorRecords.find(scene=>scene._id.$oid === currentSceneId);


    return (<>
            {currentSceneId && (<ThreeEditor
                sceneId={currentSceneId}
                storeId={storeId}
                sceneData={sceneData}
                mode={mode}
                allowEventsForMarkerTypeOnly={selectedHotspotType}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onDrop={onDrop}
            >
                {sceneObjects.map((item)=>{
                    const hotspot_type = item.props.hotspot_type;

                    // Always use unique keys!!!
                    if(hotspot_type === 'product_image') {
                        return <Hotspot
                            key={item._id}
                            hotspot_type='image_hotspot'
                            collider_transform={item.collider_transform}
                            transform={item.transform}
                            scale={item.props.scale}
                            renderOrder={item.props.renderOrder}
                            image={item.props?.image}
                            userData={item}
                        />
                    }
                    else{
                        return (<Hotspot
                             key={item._id}
                             hotspot_type='hotspot'
                             collider_transform={item.collider_transform}
                             transform={item.transform}
                             userData={item} />)
                    }
                })}
            </ThreeEditor>)}
        </>);
}


export default SceneEditor;
