import React from "react";
import {updateHotspotAPI} from "../../../../APImethods";
import HotspotMarkerUIForm from "../../MarkerForms/HotspotMarkerUIForm";
import {HotspotMarker} from "../../../../three-js/_constructors/Markers";
import {CollisionManagerActionEnums} from "../../../../three-js/_DataManagers/CollisionManager";


const _createMarker=(userData={} )=>{
    return new HotspotMarker({
        userData:userData,
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











export const addNewProductMarker = (e, intersects, sceneRef, colliderDispatch) => {
    // const { point } = intersects[0];
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


// export const createProductMarker = (e, intersects, sceneRef, colliderDispatch) => {
//     const { point } = intersects[0];
//     const newMarker = renderProductMarker({}, sceneRef, colliderDispatch);
//     console.log('>createProductMarker', {point, newMarker});
//     colliderDispatch({
//         type: CollisionManagerActionEnums.SET_COLLIDERS,
//         payload: newMarker.sceneObject,
//     });
//
//     newMarker.setPosition(point.x, point.y, point.z);
//     newMarker.onClick(e);
// };


//Actually createAndRenderProductMarker
export const renderProductMarker = (userData={}, sceneRef, colliderDispatch) => {
    // console.log('_render:ProdM', object);
    const marker = _createMarker(userData);
    marker.addToScene(sceneRef.current);
    marker.setScale();
    marker.setColliderDispatcher(colliderDispatch);

    return marker;
};
