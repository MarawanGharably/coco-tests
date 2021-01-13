export const threeEditorMouseEvents = (
    renderer,
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

    const onMarkerDrag = (e) => console.log('~~~~~~~~~~~ marker dragging function ~~~~~~~~~~'); // eslint-disable-line

    const onMouseUp = (e) => {
        if (e.button !== 0 || e.target.tagName !== 'CANVAS') {
            return;
        }

        getMousePosition(mouseRef, e);
        const dragDistance = mouseRef.current.distanceTo(mouseStart.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);
        const clickedItem = intersects[0];
        const { point } = clickedItem;

        console.log('~~~~ BEGIN intersects object ~~~~~~~'); // eslint-disable-line
        console.log(intersects); // eslint-disable-line
        console.log('~~~~ END intersects object ~~~~~~~'); // eslint-disable-line

        if (dragDistance > DESKTOP_THRESHOLD) {
            if (clickedItem.object.name === 'marker') {
                onMarkerDrag(); // TODO: MOVE THE MARKER FUNCTION
            }
            return;
            // early return so mouse up doesn't trigger a marker placement
        }

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

        if (clickedItem.object.name === 'marker') {
            clickedItem.object.onClick();
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

    // 2 main functions of event listeners
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
