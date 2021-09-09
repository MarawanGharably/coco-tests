import * as THREE from 'three';
import {CollisionManagerActionEnums} from "../collision-manager/CollisionManager";
import {UIManagerEnums} from "../ui-manager/UIManager";
import ProductImageControls from "../../components/Scene/product-library/product-image-controls/ProductImageControls";
import {ThreeProductImage} from "../_constructors/Markers";
import React from "react";



export const addProductImageOnDrop=(e, cameraRef, folderId, products, maxRenderOrder, colliderDispatch, UIDispatch, sceneRef, setMaxRenderOrder )=>{
    e.preventDefault();
    const imageId = e.dataTransfer.getData('id');
    // const folderId = e.dataTransfer.getData('folderId');
    // const folderId = selectedFolder.value;
    // console.log('>addProductImage', {products, folderId });

    const image = products[folderId].find(item => item._id === imageId);

    // if (!imageId && !image) return;

    const marker = renderProductImageMarker({
        renderOrder:maxRenderOrder,
        imageId,
        folderId,
        image,
        isFromDrop: true
    },
        sceneRef, UIDispatch, colliderDispatch, setMaxRenderOrder
        );

    // Set Position to in front of camera
    const pos = new THREE.Vector3(0, 0, -10);
    pos.applyQuaternion(cameraRef.current.quaternion);
    marker.setPosition(pos.x, pos.y, pos.z);
    marker.lookAt();
    marker.setRenderOrder(maxRenderOrder);

    // Add Colliders
    colliderDispatch({
        type: CollisionManagerActionEnums.SET_COLLIDERS,
        payload: marker.sceneObject,
    });

    // Removes existing UIs
    UIDispatch({type: UIManagerEnums.RESET_UIS});

    marker.renderComponentImmediately();
}



export const renderProductImageMarker = (object={}, sceneRef, UIDispatch, colliderDispatch, setMaxRenderOrder) => {
    const {collider_transform, transform} = object;
    console.log('>renderProductImageMarker', {object, sceneRef } );


    //render existing object. New object provides imageUrl prop.
    // if(object.id && !object?.imageUrl){
    //     const product = products.find((p) => p.id === object.image_id);
    //     if (!product || !isEnabled) return false;
    //     dispatch(setLoadingAction(true));
    //     object.imageUrl = product.imageUrl;
    // }

    const renderProps = getProductImageMarkerRenderProps(object);
    // const renderProps={
    //     type: object.hotspot_type || 'product_image', //optional
    //     id: object.id,//optional
    //     image: object?.props && object.props.image, //!present
    //     renderOrder: object.renderOrder,//!present
    // };

    // //optional props
    // if(object.folderId) renderProps.folderId = object.folderId;
    // if(object.imageId) renderProps.imageId = object.imageId;
    // if(object.scale) renderProps.scale = object.scale;


    const componentToRender = (props) => <ProductImageControls {...props} />;
    const marker = new ThreeProductImage(componentToRender, renderProps, collider_transform, transform);

    marker.addToScene(sceneRef.current);
    marker.setUIDispatcher(UIDispatch);
    marker.setColliderDispatcher(colliderDispatch);

    if (renderProps.renderOrder) {
        setMaxRenderOrder(renderProps.renderOrder);
    }

    return marker;
};

const getProductImageMarkerRenderProps = (object) => {
    const { isFromDrop } = object;
    if (isFromDrop) {
        // Construct props if the object is rendered from drag and drop
        return {
            // id: object.imageId,
            imageId: object.imageId,
            image: object.image,
            renderOrder: object.renderOrder,
            type: 'product_image'
        };
    } else {
        // Construct props for object rendered from existing DB object
        return {
            type: object.props.hotspot_type,
            id: object._id,
            image: object?.props && object.props.image,
            renderOrder: object.props.renderOrder,
        }
    }
}

