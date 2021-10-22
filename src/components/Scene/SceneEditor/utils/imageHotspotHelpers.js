import React from 'react';
import * as THREE from 'three';
import ImageMarkerUIForm from '../../MarkerForms/ImageMarkerUIForm';
import { ImageMarker } from '../../../../three-js/_constructors/Markers';
import { apiCreateHotspotByType } from '../../../../APImethods';


const sleep =(ms)=> new Promise((res, rej)=>setTimeout(()=>res(), ms));


export const renderImageHotspotRecord = (object, sceneRef, setMaxRenderOrder) => {
    // console.log('-render: image HP', object);
    const marker = new ImageMarker({
        image: object.image,
        renderOrder: object.renderOrder,
        scale: object.scale,
        collider_transform: object.collider_transform,
        transform: object.transform,
        userData: object.userData,
        UIConfig:{
            Component:ImageMarkerUIForm,
            style:{left:'0', top:'3em', background:'none'}
        },
    });

    marker.addToScene(sceneRef.current);

    if (object.renderOrder) setMaxRenderOrder(object.renderOrder);

    return marker;
};





export const addImageHotspotOnDrop = async (e, storeId, currentSceneId, cameraRef, folderId, products, maxRenderOrder, scene, setMaxRenderOrder) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('id');
    const image = products[folderId].find((item) => item._id === imageId);
    const renderOrder = maxRenderOrder;
    const scale = 1;

    setMaxRenderOrder(renderOrder);

    //1. Create Image Marker
    const marker = new ImageMarker({
        image,
        renderOrder,
        scale,
        userData: {},
        UIConfig:{
            Component:ImageMarkerUIForm,
            style:{left:0, top:'3em', background:'none'}
        }
    });

    //2. Render Marker
    marker.addToScene(scene);

    //3. Set Position to in front of camera
    const pos = new THREE.Vector3(0, 0, -10);
    pos.applyQuaternion(cameraRef.current.quaternion);
    marker.setPosition(pos.x, pos.y, pos.z);
    marker.lookAt();
    marker.setUserData({imageId});

    //4. Get Transform data
    const transforms = marker.getTransforms();
    await sleep(1000); //Important!!! Do not delete sleep method from here!!!!!


    //6. Create Hotspot record
    const HOTSPOT_TYPE = 'product_image';
    const record = await apiCreateHotspotByType(HOTSPOT_TYPE, storeId, currentSceneId, {
        type: 'HotspotMarker',
        scene: currentSceneId,
        collider_transform: transforms.colliderTransform.elements,
        transform: transforms.visualTransform.elements,
        props: {
            show_icon: true, //Where it used?
            renderOrder: renderOrder,
            scale: scale,
            hotspot_type: HOTSPOT_TYPE,
            image: imageId,
        },
    });

    //7. Update marker.userData value
    marker.setUserData(record);
    marker.onClick();
};
