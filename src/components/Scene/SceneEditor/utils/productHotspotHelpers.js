import React from "react";
import {updateHotspotAPI} from "../../../../APImethods";
import HotspotMarkerUIForm from "../../MarkerForms/HotspotMarkerUIForm";
import {HotspotMarker} from "../../../../three-js/_constructors/Markers";
import {CollisionManagerActionEnums} from "../../../../three-js/_DataManagers/CollisionManager";


const _createMarker=(userData={} )=>{
   // console.log('--_createMarker', {userData} );
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

const _renderMarker=(marker, scene, colliderDispatch)=>{
    marker.addToScene(scene);
    marker.setScale();
    marker.setColliderDispatcher(colliderDispatch);

    return marker;
}


export const dragReleaseProductHotspotAutoSave = async (object, currentSceneId, storeId, reduxDispatch) => {
    if (!object) return;

    const marker = object.owner;
    console.log('__dragReleaseProductHotspotAutoSave',{marker});

    const { colliderTransform, visualTransform } = marker.getTransforms();
    const {_id, props:{hotspot_type, product_sku, scale, renderOrder } } = marker.userData;

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


    if (_id) {
        console.log('>check id here', _id);
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
 * @param colliderDispatch
 */
export const createProductMarkerOnEvent = (e, intersects, sceneRef, colliderDispatch) => {
    //TODO: what kind of scene object can we use to properly detect position? intersects[0] is not correct solution
    const sceneObject = intersects.find(item=>item.object.name !=='marker');
    const point = sceneObject.point;
    const newMarker = _createMarker();

    _renderMarker(newMarker, sceneRef.current, colliderDispatch);


    colliderDispatch({
        type: CollisionManagerActionEnums.SET_COLLIDERS,
        payload: newMarker.sceneObject,
    });

    newMarker.setPosition(point.x, point.y, point.z);
    newMarker.onClick(e);
}


/**
 * Renders marker from stored hotspot record {}
 * @param userData - DB record
 * @param sceneRef
 * @param colliderDispatch
 * @returns {HotspotMarker}
 */
export const renderProductHotspotRecord = (dbRecord={}, sceneRef, colliderDispatch) => {
    // console.log('_render:ProdM', object);
    const marker = _createMarker(dbRecord);

    marker.addToScene(sceneRef.current);
    marker.setTransform(dbRecord.collider_transform, dbRecord.transform);
    marker.setScale();
    marker.setColliderDispatcher(colliderDispatch);

    return marker;
};
