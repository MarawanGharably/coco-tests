import { Vector3, Matrix4 } from 'three';
import * as THREE from 'three';

import {
    PRODUCT_TAGGING,
    PRODUCT_PLACEMENT,
} from '../../components/Scene/ModeSelector/modeOptions';




export const threeEditorMouseEvents = (
    renderer,
    controlsRef,
    cameraRef,
    colliderRef,
    canvasContainer,
    mode,
    allowEventsForMarkerTypeOnly,
    UI,
    setUI,
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

    //Mouse positions
    const mouseRef = new THREE.Vector2();
    const mouseStartRef = new THREE.Vector2();

    const raycaster = new THREE.Raycaster();

    const setMousePosition = (refToUpdate, e) => {
        const canvasDimensions = renderer.domElement.getBoundingClientRect();
        const {top, left, width, height} = canvasDimensions;
        const x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
        const y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line
        // console.log('>setMousePosition', {top, left, width, height, x, y});

        refToUpdate.x = x;
        refToUpdate.y = y;
        return { x, y, canvasDimensions }
    };

    const getMousePosition = () => {
        return mouseRef;
    }

    /**
     * onMouseDown Scene Event
     * @param e
     * Note: currently returns marker object that selected based on provided parameters.
     * In future, we may need/want to access intersection objects [] from provided callback function,
     * But I would recommend to avoid it if possible and keep computation of selected marker as part of the code.
     */
    const onMouseDown = (e) => {
        const mousePos = setMousePosition(mouseStartRef, e);
        raycaster.setFromCamera(mouseStartRef, cameraRef.current);
        const intersects = raycaster.intersectObjects(colliderRef.current);

        //
        const marker = intersects.find((intersect) => {
            const markerType = intersect?.object?.owner?.hotspot_type;
            //apply extra filter
            if(allowEventsForMarkerTypeOnly && markerType) return markerType === allowEventsForMarkerTypeOnly;
            //or return any type of marker
            return intersect.object.name === 'marker';
        });

        console.log('-onMouseDown', {allowEventsForMarkerTypeOnly,   marker, markerType: marker?.object?.owner?.hotspot_type});

        if (marker) {
            isMarkerClicked = true;
            controlsRef.current.enabled = false; //eslint-disable-line
            focusedObject = marker.object;
            const { point } = marker;
            //TODO: what it does?
            if(!focusedObject?.parent) console.error('Prop Not Found');
            if(focusedObject?.parent) inverseMatrix.copy(focusedObject.parent.matrixWorld).getInverse(inverseMatrix);
            offset.copy(point).sub(worldPosition.setFromMatrixPosition(focusedObject.matrixWorld));
        }

        //Public interface
        if(onMouseDownCallback) onMouseDownCallback(e, marker, {mousePos});
    };



    const onMouseUp = (e) => {
        setMousePosition(mouseRef, e);
        controlsRef.current.enabled = true; //eslint-disable-line

        const dragDistance = mouseRef.distanceTo(mouseStartRef);
        raycaster.setFromCamera(mouseRef, cameraRef.current);
        const intersects = raycaster.intersectObjects(colliderRef.current);
        const isDragEvent = (dragDistance > DESKTOP_THRESHOLD);



        const markerIntersection = intersects.find((intersect) => {
            const markerType = intersect?.object?.owner?.hotspot_type;
            //apply extra filter
            if(allowEventsForMarkerTypeOnly && markerType) return markerType === allowEventsForMarkerTypeOnly && intersect.object.name === 'marker';

            return intersect.object.name === 'marker';
        });
        const marker = markerIntersection?.object;

        // public method/callback
        if(onMouseUpCallback) onMouseUpCallback(e, marker, intersects, {DESKTOP_THRESHOLD, dragDistance, isDragEvent, isMarkerClicked });

        //reset data
        if (dragDistance > DESKTOP_THRESHOLD) {
            if (isMarkerClicked) isMarkerClicked = false;
        }else{
            isMarkerClicked = false;
        }
    };








    const onMouseMove = (e) => {
        // const mousePosition = getMousePosition(mouseRef, e);
        // console.log('%c __onMouseMove__', 'color:red', {focusedObject, isMarkerClicked});
        //public callback/interface
        if(onMouseMoveCallback) onMouseMoveCallback(e, focusedObject, isMarkerClicked);

        if (focusedObject && isMarkerClicked) {
            moveFocusedObject(e);
        } else if (focusedObject) {
            focusedObject = null;
        }
    };

    //TODO: move hotspot_type specific computation on the upper user level
    const moveFocusedObject = (e) => {
        const { hotspot_type } = focusedObject.owner.userData.props;
        const isProductMarker = mode === PRODUCT_TAGGING && hotspot_type === 'product';
        const isProductImage = mode === PRODUCT_PLACEMENT && hotspot_type === 'product_image';

        //move only objects related to selected mode
        if (isProductMarker || isProductImage) {
            setMousePosition(mouseRef, e);
            raycaster.setFromCamera(mouseRef, cameraRef.current);
            const intersects = raycaster.intersectObjects(colliderRef.current);
            const { point } = intersects[0];
            const { x, y, z } = point.sub(offset).applyMatrix4(inverseMatrix);
            focusedObject.owner.setPosition(x, y, z);
        }
    };

    const preventContextMenu = (e) => {
        if (e.target.id === 'modal-overlay') {
            e.preventDefault();
            return false;
        }
        return true;
    };


    const mouseWheelHandler = (e) => {
        const fovDelta = e.deltaY;
        const temp = cameraRef.current.fov + (fovDelta * 0.05);

        if (temp > MIN_ZOOM_FOV && temp < MAX_ZOOM_FOV) {
            cameraRef.current.fov = temp; // eslint-disable-line
            cameraRef.current.updateProjectionMatrix();
        }
    };

    const windowResizeHandler = () => {
        const width = canvasContainer.offsetWidth;
        const height = canvasContainer.offsetHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        renderer.setSize(width, height);

        if(UI) setUI(false); //destroy UI
    };




    // 2 main functions of event listeners
    const addThreeEditorMouseEventListeners = () => {
        window.addEventListener('resize', windowResizeHandler);

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp,  { passive: true });
        renderer.domElement.addEventListener('contextmenu', preventContextMenu);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('wheel', mouseWheelHandler, { passive: true });
    };

    const removeThreeEditorMouseEventListeners = () => {
        window.removeEventListener('resize', windowResizeHandler);

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
