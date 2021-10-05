import { Vector3, Matrix4 } from 'three';

import {
    PRODUCT_TAGGING,
    PRODUCT_PLACEMENT,
} from '../../components/Scene/ModeSelector/modeOptions';

export const threeEditorMouseEvents = (
    renderer,
    controlsRef,
    mouseStartRef,
    mouseRef,
    cameraRef,
    raycasterRef,
    colliderRef,
    mode,
    onMouseDownCallback,
    onMouseUpCallback,
    onMouseMoveCallback
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

    const getMousePosition = (refToUpdate, e) => {
        const {top, left, width, height} = renderer.domElement.getBoundingClientRect();
        const x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
        const y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line

        refToUpdate.current.x = x;
        refToUpdate.current.y = y;
        return { x, y }
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

        //Public interface
        if(onMouseDownCallback) onMouseDownCallback(e, marker);
    };









    const onMouseUp = (e) => {
        controlsRef.current.enabled = true; //eslint-disable-line

        getMousePosition(mouseRef, e);
        const dragDistance = mouseRef.current.distanceTo(mouseStartRef.current);

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
        const markerIntersection = intersects.find((intersect) => intersect.object.name === 'marker');
        const markerOnRelease = markerIntersection && markerIntersection.object;

        // if (markerOnRelease) resetUI(markerOnRelease);


        // public method/callback
        if(onMouseUpCallback) onMouseUpCallback(e, markerOnRelease, {
            DESKTOP_THRESHOLD,
            dragDistance,
            isMarkerClicked,
            intersects
        });


        if (dragDistance > DESKTOP_THRESHOLD) {
            if (isMarkerClicked) isMarkerClicked = false;
        }else{
            isMarkerClicked = false;
        }
    };

    const mouseWheelHandler = (e) => {
        const fovDelta = e.deltaY;
        const temp = cameraRef.current.fov + (fovDelta * 0.05);

        if (temp > MIN_ZOOM_FOV && temp < MAX_ZOOM_FOV) {
            cameraRef.current.fov = temp; // eslint-disable-line
            cameraRef.current.updateProjectionMatrix();
        }
    };

    //TODO: what for we checking hotspot type?
    // Isn't all scene objects suppose to be able to move?
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
        const mousePosition = getMousePosition(mouseRef, e);

        //public callback/interface
        if(onMouseMoveCallback) onMouseMoveCallback(e, focusedObject, {
            isMarkerClicked,
            mousePosition
        });

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
        renderer.domElement.addEventListener('mouseup', onMouseUp,  { passive: true });
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
