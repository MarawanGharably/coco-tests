export const threeEditorMouseEvents = (
    renderer,
    mouseStart,
    mouseRef,
    canvasContainerRef,
    cameraRef,
    raycasterRef,
    colliderRef,
    renderMarker, // function
    DESKTOP_THRESHOLD, // constant
    MIN_ZOOM_FOV, // constant
    MAX_ZOOM_FOV, // constant
    colliderDispatch, // function
    CollisionManagerActionEnums,
) => {
    const getMousePosition = (refToUpdate, e) => {
        const {
            top, left, width, height,
        } = renderer.domElement.getBoundingClientRect();

        refToUpdate.current.x = -1 + 2 * (e.clientX - left) / width; // eslint-disable-line
        refToUpdate.current.y = 1 - 2 * (e.clientY - top) / height; // eslint-disable-line
    };

    const onMouseDown = (e) => {
        if (e.button !== 0 || e.target.tagName !== 'CANVAS') {
            return;
        }

        getMousePosition(mouseStart, e);
    };

    const onMouseUp = (e) => {
        if (e.button !== 0 || e.target.tagName !== 'CANVAS') {
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

    const preventContextMenu = (e) => {
        if (e.target.id === 'modal-overlay') {
            e.preventDefault();
            return false;
        }
        return true;
    };

    // main export of event listeners
    const addThreeEditorMouseEventListeners = () => {
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('contextmenu', preventContextMenu);
        canvasContainerRef.current.addEventListener('wheel', mouseWheelHandler, { passive: true });
    };

    const removeThreeEditorMouseEventListeners = () => {
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('contextmenu', preventContextMenu);
        canvasContainerRef.current.removeEventListener('wheel', mouseWheelHandler);
    };

    return {
        addThreeEditorMouseEventListeners,
        removeThreeEditorMouseEventListeners,
    };
};
