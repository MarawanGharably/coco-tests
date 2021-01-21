import { apiUpdateHotspotByType } from '../../utils/apiUtils';
import { DATA_MANAGER_ENUMS } from '../data-manager/DataManager';

export const threeEditorMouseEvents = (
    renderer,
    controls,
    mouseStartRef,
    mouseRef,
    canvasContainerRef,
    cameraRef,
    raycasterRef,
    colliderRef,
    renderMarker, // function
    colliderDispatch, // function
    CollisionManagerActionEnums,
    currentSceneId,
    dataDispatch,
) => {
    const DESKTOP_THRESHOLD = 0.005;
    const MIN_ZOOM_FOV = 20;
    const MAX_ZOOM_FOV = 70;

    // reference to the object that is clicked/being dragged
    let isMarkerClicked = false;
    let focusedObject = null;
    let pendingSaveProductObject = null;

    const getMousePosition = (refToUpdate, e) => {
        const {
            top, left, width, height,
        } = renderer.domElement.getBoundingClientRect();

        refToUpdate.current.x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
        refToUpdate.current.y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line
    };

    const dragReleaseProductHotspotAutoSave = async (object) => {
        const hotspotType = 'product';
        const currentProductMarker = object.object.owner;
        const { colliderTransform, visualTransform } = currentProductMarker.getTransforms();
        const { id, productSKU } = currentProductMarker.modalComponentRenderProps;

        const postData = {
            type: hotspotType,
            scene_id: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                product_sku: productSKU,
                hotspot_type: hotspotType,
            },
        };
        const selectedStoreId = sessionStorage.getItem('STORE_ID');

        if (id) {
            try {
                const response = await apiUpdateHotspotByType(
                    hotspotType, selectedStoreId, id, postData,
                );
                const roomObject = {
                    collider_transform: colliderTransform.elements,
                    transform: visualTransform.elements,
                    id: response._id.$oid, //eslint-disable-line
                    sku: productSKU,
                };

                dataDispatch({
                    type: DATA_MANAGER_ENUMS.UPDATE_ROOM_OBJECT_DATA,
                    payload: {
                        roomObject,
                    },
                });
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
            controls.enabled = false; // eslint-disable-line
            focusedObject = marker.object;
        }
    };

    const onMouseUp = (e) => {
        controls.enabled = true; // eslint-disable-line

        getMousePosition(mouseRef, e);
        const dragDistance = mouseRef.current.distanceTo(mouseStartRef.current);

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
        const markerOnRelease = intersects.find((intersect) => intersect.object.name === 'marker');

        if (dragDistance > DESKTOP_THRESHOLD) {
            if (isMarkerClicked) {
                isMarkerClicked = false;
                pendingSaveProductObject = markerOnRelease;
                dragReleaseProductHotspotAutoSave(pendingSaveProductObject);
            }
            return;
        }

        if (isMarkerClicked) {
            isMarkerClicked = false;
            if (markerOnRelease.object.name === 'marker') {
                markerOnRelease.object.onClick();
            }
            return;
        }

        const { point } = intersects[0];

        const newMarker = renderMarker();

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: newMarker.sceneObject,
        });
        newMarker.setPosition(point.x, point.y, point.z);

        newMarker.renderComponentImmediately();
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
        getMousePosition(mouseRef, e);
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
        const { point } = intersects[1];
        const { x, y, z } = point;
        focusedObject.owner.setPosition(x, y, z);
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
        canvasContainerRef.current.addEventListener('mousedown', onMouseDown);
        canvasContainerRef.current.addEventListener('mouseup', onMouseUp);
        canvasContainerRef.current.addEventListener('contextmenu', preventContextMenu);
        canvasContainerRef.current.addEventListener('mousemove', onMouseMove);
        canvasContainerRef.current.addEventListener('wheel', mouseWheelHandler, { passive: true });
    };

    const removeThreeEditorMouseEventListeners = () => {
        canvasContainerRef.current.removeEventListener('mousedown', onMouseDown);
        canvasContainerRef.current.removeEventListener('mouseup', onMouseUp);
        canvasContainerRef.current.removeEventListener('contextmenu', preventContextMenu);
        canvasContainerRef.current.removeEventListener('mousemove', onMouseMove);
        canvasContainerRef.current.removeEventListener('wheel', mouseWheelHandler);
    };

    return {
        addThreeEditorMouseEventListeners,
        removeThreeEditorMouseEventListeners,
    };
};
