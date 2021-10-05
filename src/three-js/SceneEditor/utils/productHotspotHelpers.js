import {updateHotspotAPI} from "../../../APImethods";
import TaggingModal from "../../../components/tagging-modal/TaggingModal";
import {HotspotMarker} from "../../_constructors/Markers";
import React from "react";
import {PRODUCT_PLACEMENT, PRODUCT_TAGGING} from "../../../components/Scene/ModeSelector/modeOptions";
import {CollisionManagerActionEnums} from "../../_contextDataManagers/CollisionManager";
import {hasUI} from './UIHelpers';

export const dragReleaseProductHotspotAutoSave = async (object, currentSceneId, storeId) => {
    if (!object) return;

    const currentProductMarker = object.owner;
    const { colliderTransform, visualTransform } = currentProductMarker.getTransforms();
    const {id, type, productSKU, scale, renderOrder} = currentProductMarker.modalComponentRenderProps;

    const postData = {
        type: 'HotspotMarker',
        scene: currentSceneId,
        collider_transform: colliderTransform.elements,
        transform: visualTransform.elements,
        props: {
            hotspot_type: type,
            ...(productSKU ? {
                product_sku: productSKU,
            } : {}),
            ...(scale ? {
                scale,
            } : {}),
            ...(renderOrder ? {
                renderOrder,
            } : {}),
        },
    };


    if (id) {
        console.log('>check id here', id);
        try {
            const validate = type !== "product";
            // ATTENTION: validation is force disabled for product hotspots to bypass SKU validation. In future, please make this a frontend toggle
            await updateHotspotAPI(id, storeId, currentSceneId, postData, validate);
        } catch (err) {
            console.error(err);
        }
    }
};



export const openProductUI = (marker, isMarkerClicked, intersects, mode, sceneRef, UIState, UIDispatch, colliderDispatch) => {
    if (isMarkerClicked) {
        // isMarkerClicked = false;
        const { type } = marker.owner.modalComponentRenderProps;
        const isProductMarker = mode === PRODUCT_TAGGING && type === 'product';
        const isProductImage = (mode === PRODUCT_PLACEMENT && type === 'product_image' && !hasUI(marker, UIState));

        if (isProductImage || isProductMarker) {
            marker.onClick();
            return;
        }
    }

    if (mode === PRODUCT_TAGGING) {
        addProductMarker(intersects, sceneRef, UIDispatch, colliderDispatch);
    }
};


const addProductMarker = (intersects, sceneRef, UIDispatch, colliderDispatch) => {
    const { point } = intersects[0];
    const newMarker = renderProductMarker({}, sceneRef, UIDispatch, colliderDispatch);

    colliderDispatch({
        type: CollisionManagerActionEnums.SET_COLLIDERS,
        payload: newMarker.sceneObject,
    });

    newMarker.setPosition(point.x, point.y, point.z);

    newMarker.renderComponentImmediately();
};


export const renderProductMarker = (object={}, sceneRef, UIDispatch, colliderDispatch) => {
    const {collider_transform , transform } = object;
    const renderProps={
        type: object?.props?.hotspot_type,
        id: object?.['_id'],
        productSKU: object?.props?.product_sku,
    }
    const componentToRender = (props) => <TaggingModal {...props} />; // eslint-disable-line
    const marker = new HotspotMarker(componentToRender, renderProps, collider_transform, transform);
    marker.addToScene(sceneRef.current);
    marker.setScale();
    marker.setUIDispatcher(UIDispatch);
    marker.setColliderDispatcher(colliderDispatch);

    return marker;
};
