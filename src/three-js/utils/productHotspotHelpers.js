import * as THREE from 'three';
import {CollisionManagerActionEnums} from "../collision-manager/CollisionManager";
import {UIManagerEnums} from "../ui-manager/UIManager";
import ProductImageControls from "../../components/Scene/product-library/product-image-controls/ProductImageControls";
import {ThreeProductImage} from "../_constructors/Markers";
import React from "react";


export class ProductObject{
    constructor(data={}){
        if(data.id) this.id = data.id;

        this.type = 'product_image';
        this.image = data?.image;
        this.renderOrder = data?.renderOrder;
        this.scale = data?.scale;
        this.transform = data?.transform;
        this.collider_transform = data?.collider_transform;
    }
}


export const addProductImageOnDrop=(e, cameraRef, folderId, products, maxRenderOrder, colliderDispatch, UIDispatch, sceneRef, setMaxRenderOrder )=>{
    e.preventDefault();
    const imageId = e.dataTransfer.getData('id');

    //TODO: where it used: folderId
    const productObj = new ProductObject({
        image:products[folderId].find(item => item._id === imageId),
        renderOrder:maxRenderOrder
    });

    const marker = renderProductImageMarker(productObj, sceneRef, UIDispatch, colliderDispatch, setMaxRenderOrder );

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



export const renderProductImageMarker = (productObj, sceneRef, UIDispatch, colliderDispatch, setMaxRenderOrder) => {
    // const {collider_transform, transform} = object;


    //Prevent unrelated to rendering computation! It is not the right place!
    if(productObj?.constructor.name !=='ProductObject' && process.env.NODE_ENV == 'development'){
        throw new Error('Marker rendering function accepts only ready to use data. Use ProductObject constructor.')
    }

    const componentToRender = (props) => <ProductImageControls {...props} />;
    const marker = new ThreeProductImage(componentToRender, productObj );

    marker.addToScene(sceneRef.current);// Add reference to the scene
    marker.setUIDispatcher(UIDispatch);
    marker.setColliderDispatcher(colliderDispatch);

    if (productObj.renderOrder) setMaxRenderOrder(productObj.renderOrder);

    return marker;
};

