import * as THREE from 'three';
import { CollisionManagerActionEnums } from '../../../../three-js/_DataManagers/CollisionManager';
import ImageMarkerUIForm from '../../MarkerForms/ImageMarkerUIForm';
import { ImageMarker } from '../../../../three-js/_constructors/Markers';
import React from 'react';
import { apiCreateHotspotByType } from '../../../../APImethods';

export const renderProductImageMarker = (dbRecord, sceneRef, colliderDispatch, setMaxRenderOrder) => {
    const marker = new ImageMarker({
        image: dbRecord?.props?.image,
        renderOrder: dbRecord.props.renderOrder,
        scale: dbRecord.props?.scale,
        data: dbRecord,
        UIConfig:{
            Component:ImageMarkerUIForm,
            style:{left:'0', top:'3em', background:'none'}
        },
    });

    marker.addToScene(sceneRef.current);
    marker.setColliderDispatcher(colliderDispatch);

    if (dbRecord.props.renderOrder) setMaxRenderOrder(dbRecord.props.renderOrder);

    return marker;
};



export const addProductImageOnDrop = async (e, storeId, currentSceneId, cameraRef, folderId, products, maxRenderOrder, colliderDispatch, sceneRef, setMaxRenderOrder) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('id');
    const image = products[folderId].find((item) => item._id === imageId);
    const renderOrder = maxRenderOrder;
    const scale = 1;

    //1. Create Image Marker
    const marker = new ImageMarker({ image, renderOrder, scale, data: {},
        UIConfig:{
            Component:ImageMarkerUIForm,
            style:{left:0, top:'3em', background:'none'}
        } ,
    });

    //2. Render Marker
    marker.addToScene(sceneRef.current);

    //3. Create Hotspot record
    const { colliderTransform, visualTransform } = marker.getTransforms();
    const HOTSPOT_TYPE = 'product_image';
    const record = await apiCreateHotspotByType(HOTSPOT_TYPE, storeId, currentSceneId, {
        type: 'HotspotMarker',
        scene: currentSceneId,
        collider_transform: colliderTransform.elements,
        transform: visualTransform.elements,
        props: {
            show_icon: true, //Where it used?
            renderOrder: 1,
            scale: 1,
            hotspot_type: HOTSPOT_TYPE,
            image: imageId,
        },
    });

    //4. Update marker.data value
    marker.setMarkerData(record);

    //5. Set Position to in front of camera
    const pos = new THREE.Vector3(0, 0, -10);
    pos.applyQuaternion(cameraRef.current.quaternion);
    marker.setPosition(pos.x, pos.y, pos.z);
    marker.lookAt();

    // Add Colliders
    colliderDispatch({
        type: CollisionManagerActionEnums.SET_COLLIDERS,
        payload: marker.sceneObject,
    });

    marker.onClick();
};
