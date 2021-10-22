import React from "react";
import {updateHotspotAPI} from "../../../../APImethods";
import HotspotMarkerUIForm from "../../MarkerForms/HotspotMarkerUIForm";
import {HotspotMarker} from "../../../../three-js/_constructors/Markers";



const _createMarker=(opt={})=>{
    const {userData} = opt;
    return new HotspotMarker({
        userData:userData,
        // collider_transform,
        // transform,
        UIConfig:{
            Component:HotspotMarkerUIForm,
            positionNextToTheElement:true,
            style:{background:'none'}
        }
    });
}

const _renderMarker=(marker, scene)=>{
    marker.addToScene(scene);
    marker.setScale();

    return marker;
}


export const dragReleaseHotspotAutoSave = async (object, currentSceneId, storeId, reduxDispatch) => {
    if (!object) return;

    const marker = object.owner;
    const { colliderTransform, visualTransform } = marker.getTransforms();
    const {_id} = marker.userData;
    const markerType = marker.hotspot_type; //image_marker, hotspot_marker
    const hotspot_type= markerType =='image_marker' ? 'product_image':'product';
    const { renderOrder, scale, product_sku } = marker?.userData?.props || {};

    if (_id) {
        console.log('>check id here', _id);

        const postData = {
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                hotspot_type,
                ...(product_sku ? {product_sku} : {}),
                ...(scale ? {scale} : {}),
                ...(renderOrder ? { renderOrder} : {}),
            },
        };

        try {
            const validate = hotspot_type !== "product";
            console.log('SE:updateHotspotAPI');
            // ATTENTION: validation is force disabled for product hotspots to bypass SKU validation. In future, please make this a frontend toggle
            await reduxDispatch(updateHotspotAPI(_id, storeId, currentSceneId, postData, validate));
        } catch (err) {
            console.error(err);
        }
    }
};


/**
 * on Scene Click event
 * @param e
 * @param intersects
 * @param sceneRef
 */
export const createProductMarkerOnEvent = (e, intersects, scene) => {
    //Find underlying scene background object 
    const sceneObject = intersects.find(item=> ['BackgroundCube', 'flatBackground'].includes(item.object.name));
    const point = sceneObject.point;
    const newMarker = _createMarker();

    _renderMarker(newMarker, scene);

    newMarker.setPosition(point.x, point.y, point.z);
    newMarker.onClick(e);
}


/**
 * Renders marker from stored hotspot record {}
 * @param object - scene object
 * @param sceneRef
 * @returns {HotspotMarker}
 */
export const renderProductHotspotRecord = (object={}, sceneRef) => {
    const marker = _createMarker({userData:object.userData});

    marker.addToScene(sceneRef.current);
    marker.setTransform(object.collider_transform, object.transform);
    marker.setScale();

    return marker;
};
