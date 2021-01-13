/* eslint-disable */

export const threeEditorMouseEvents = (
    renderer,
    controls,
    mouseStart,
    mouseRef,
    canvasContainerRef,
    cameraRef,
    raycasterRef,
    colliderRef,
    renderMarker, // function
    colliderDispatch, // function
    CollisionManagerActionEnums,
) => {
    const DESKTOP_THRESHOLD = 0.005;
    const MIN_ZOOM_FOV = 20;
    const MAX_ZOOM_FOV = 70;

    let isMarkerClicked = false;
    const isMouseMoving = false;
    let focusedObject = null;

    const getMousePosition = (refToUpdate, e) => {
        const {
            top, left, width, height,
        } = renderer.domElement.getBoundingClientRect();

        refToUpdate.current.x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
        refToUpdate.current.y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line
    };

    const onMouseDown = (e) => {
        // if (e.button !== 0 || e.target.tagName !== 'CANVAS') {
        //     return;
        // }

        getMousePosition(mouseStart, e);
        raycasterRef.current.setFromCamera(mouseStart.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);

        if (intersects[0].object.name === 'marker') {
            isMarkerClicked = true;
            controls.enabled = false;
            focusedObject = intersects[0].object;
            console.log(focusedObject);

            // onClick opens up modalUI - need to open up modal UI after replacement is done
            intersects[0].object.onClick();
        }
    };


    const onMouseUp = (e) => {
        controls.enabled = true;

        if (isMarkerClicked) {
            isMarkerClicked = false;
            focusedObject = null;
            return;
        }

        getMousePosition(mouseRef, e);

        const dragDistance = mouseRef.current.distanceTo(mouseStart.current);

        if (dragDistance > DESKTOP_THRESHOLD) {
            return;
        }

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);

        const { point } = intersects[0];
        if (intersects[0].object.name === 'marker') {
            intersects[0].object.onClick();
            return;
        }

        const marker = renderMarker();

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: marker.sceneObject,
        });
        marker.setPosition(point.x, point.y, point.z);

        marker.renderComponentImmediately();
    };

    const mouseWheelHandler = (e) => {
        const fovDelta = e.deltaY;
        const temp = cameraRef.current.fov + (fovDelta * 0.05);

        if (temp > MIN_ZOOM_FOV && temp < MAX_ZOOM_FOV) {
            cameraRef.current.fov = temp; // eslint-disable-line
            cameraRef.current.updateProjectionMatrix();
        }
    };

    const onMouseMove = (e) => {
        // updateFocusedObject() create this function to update object that is in focus
        console.log('~~~~~~~~~~~ onMouseMove function ~~~~~~~~~~');
        getMousePosition(mouseStart, e);
        console.log(focusedObject);
        if (focusedObject) {

        }

        console.log(controls.enabled);
    };

    // onMouseMove(event) {
    //     let mousePosition = getMousePositionInWebGLRenderer(this.renderer, event.clientX, event.clientY);
    //     if (this.isMoving && this.focusedObject) {
    //         this.moveFocusedObject(mousePosition);
    //         return;
    //     }
    //     this.updateFocusedObject(mousePosition);
    // }

    // moveFocusedObject(mousePosition) {
    //     this.raycaster.setFromCamera(mousePosition, this.camera);
    //     let hitObjects = this.raycaster.intersectObject(this.targetMesh);
    //     if (hitObjects.length > 0) {
    //         let newPos = hitObjects[0].point;
    //         if (this.focusedObject.transform) {
    //             this.focusedObject.transform.setPosition(newPos);
    //         } else {
    //             console.error('Focused object don`t have a transform property! Focused object: ' + this.focusedObject);
    //         }
    //     }
    //     else {
    //         console.log('Raycast not intersecting with target sphere!');
    //     }
    // }

    // updateFocusedObject(mousePosition) {
    //     let hitObject = this.doRaycast(mousePosition);
    //     if (this.focusedObject === hitObject) {
    //         return;
    //     }
    //     if (hitObject) {
    //         this.focusedObject = hitObject;
    //         document.body.style.cursor = 'grab';
    //         document.body.style.cursor = '-webkit-grab';
    //         (this.focusedObject.onHover || Function)()
    //     } else {
    //         document.body.style.cursor = 'default';
    //         (this.focusedObject.onUnhover || Function)();
    //         this.focusedObject = null;
    //     }
    // }

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
