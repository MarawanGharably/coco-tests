import { Vector3, Matrix4 } from 'three';
import { apiUpdateHotspotByType} from '../../APImethods/HotspotsAPI';

import {
    PRODUCT_TAGGING,
    PRODUCT_PLACEMENT,
} from '../../components/Scene/ModeSelector/modeOptions';

export const threeEditorMouseEvents = (
    storeId,
    renderer,
    controlsRef,
    mouseStartRef,
    mouseRef,
    cameraRef,
    raycasterRef,
    colliderRef,
    renderProductMarker, // function
    colliderDispatch, // function
    CollisionManagerActionEnums,
    currentSceneId,
    UIState,
    UIDispatch,
    UIManagerEnums,
    mode,
) => {
    const DESKTOP_THRESHOLD = 0.005;
    const MIN_ZOOM_FOV = 20;
    const MAX_ZOOM_FOV = 70;
    const offset = new Vector3();
    const worldPosition = new Vector3();
    const inverseMatrix = new Matrix4();

    // reference to the object that is clicked/being dragged
    let isMarkerClicked = false;
    let focusedObject = null;
    let pendingSaveProductObject = null;

    const getMousePosition = (refToUpdate, e) => {
        const {top, left, width, height} = renderer.domElement.getBoundingClientRect();

        refToUpdate.current.x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
        refToUpdate.current.y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line
    };

    const dragReleaseProductHotspotAutoSave = async (object) => {
        if (!object) return;

        const currentProductMarker = object.owner;
        const { colliderTransform, visualTransform } = currentProductMarker.getTransforms();
        const {id, type, productSKU, scale, renderOrder} = currentProductMarker.modalComponentRenderProps;

        const postData = {
            type,
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
            try {
                await apiUpdateHotspotByType(type, storeId, currentSceneId, id['$oid'], postData );
            } catch (err) {
                console.error(err);
            }
        }
        pendingSaveProductObject = null;
    };

    const onMouseDown = (e) => {
        getMousePosition(mouseStartRef, e);
        raycasterRef.current.setFromCamera(mouseStartRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
        const marker = intersects.find((intersect) => intersect.object.name === 'marker');

        if (marker) {
            isMarkerClicked = true;
            controlsRef.current.enabled = false; //eslint-disable-line
            focusedObject = marker.object;
            const { point } = marker;
            inverseMatrix.copy(focusedObject.parent.matrixWorld).getInverse(inverseMatrix);
            offset.copy(point).sub(worldPosition.setFromMatrixPosition(focusedObject.matrixWorld));
        }
    };

    const getComponentUUID = (marker) => {
        const { uuid } = marker.owner.components.find((component) => (
            component.uuid
        ));

        return uuid;
    };

    const hasUI = (marker) => {
        const uuid = getComponentUUID(marker);
        return UIState.dynamicUIs.has(uuid);
    };

    const resetUI = (object) => {
        if (!hasUI(object)) {
            UIDispatch({
                type: UIManagerEnums.RESET_UIS,
            });
        }
    };

    const addProductMarker = (intersects) => {
        const { point } = intersects[0];

        const newMarker = renderProductMarker();

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: newMarker.sceneObject,
        });

        newMarker.setPosition(point.x, point.y, point.z);

        newMarker.renderComponentImmediately();
    };

    const openProductUI = (markerOnRelease, intersects) => {
        if (isMarkerClicked) {
            isMarkerClicked = false;
            const { type } = markerOnRelease.owner.modalComponentRenderProps;
            const isProductMarker = mode === PRODUCT_TAGGING && type === 'product';
            const isProductImage = (
                mode === PRODUCT_PLACEMENT
                    && type === 'product_image'
                    && !hasUI(markerOnRelease)
            );

            if (isProductImage || isProductMarker) {
                markerOnRelease.onClick();
                return;
            }
        }

        if (mode === PRODUCT_TAGGING) {
            addProductMarker(intersects);
        }
    };

    const onMouseUp = (e) => {
        controlsRef.current.enabled = true; //eslint-disable-line

        getMousePosition(mouseRef, e);
        const dragDistance = mouseRef.current.distanceTo(mouseStartRef.current);

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
        const markerIntersection = intersects.find((intersect) => intersect.object.name === 'marker');
        const markerOnRelease = markerIntersection && markerIntersection.object;

        if (markerOnRelease) {
            resetUI(markerOnRelease);
        }

        if (dragDistance > DESKTOP_THRESHOLD) {
            if (isMarkerClicked) {
                isMarkerClicked = false;
                pendingSaveProductObject = markerOnRelease;
                dragReleaseProductHotspotAutoSave(pendingSaveProductObject);
            }
            return;
        }

        openProductUI(markerOnRelease, intersects);
    };

    const mouseWheelHandler = (e) => {
        const fovDelta = e.deltaY;
        const temp = cameraRef.current.fov + (fovDelta * 0.05);

        if (temp > MIN_ZOOM_FOV && temp < MAX_ZOOM_FOV) {
            cameraRef.current.fov = temp; // eslint-disable-line
            cameraRef.current.updateProjectionMatrix();
        }
    };

    const moveFocusedObject = (e) => {
        const { type } = focusedObject.owner.modalComponentRenderProps;
        const isProductMarker = mode === PRODUCT_TAGGING && type === 'product';
        const isProductImage = mode === PRODUCT_PLACEMENT && type === 'product_image';

        if (isProductMarker || isProductImage) {
            getMousePosition(mouseRef, e);
            raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
            const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
            const { point } = intersects[0];
            const { x, y, z } = point.sub(offset).applyMatrix4(inverseMatrix);
            focusedObject.owner.setPosition(x, y, z);
        }
    };

    const onMouseMove = (e) => {
        if (focusedObject && isMarkerClicked) {
            moveFocusedObject(e);
        } else if (focusedObject) {
            focusedObject = null;
        }
    };

    const preventContextMenu = (e) => {
        if (e.target.id === 'modal-overlay') {
            e.preventDefault();
            return false;
        }
        return true;
    };

    // 2 main functions of event listeners
    const addThreeEditorMouseEventListeners = () => {
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('contextmenu', preventContextMenu);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('wheel', mouseWheelHandler, { passive: true });
    };

    const removeThreeEditorMouseEventListeners = () => {
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('mouseup', onMouseUp);
        renderer.domElement.removeEventListener('contextmenu', preventContextMenu);
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
        renderer.domElement.removeEventListener('wheel', mouseWheelHandler);
    };

    return {
        addThreeEditorMouseEventListeners,
        removeThreeEditorMouseEventListeners,
    };
};
