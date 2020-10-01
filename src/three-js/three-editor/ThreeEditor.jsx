import React, {
    useState, useEffect, useRef, createContext, useReducer, useContext,
} from 'react';
import * as THREE from 'three';

import OrbitControls from '../three-controls/OrbitControls';
import { setupRenderer, setupCamera, setupControls } from './setupThreeEditor';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';
import ThreeProductMarker from '../hotspot-marker/ThreeProductMarker';
import { useUIManager } from '../ui-manager/UIManager';
import TaggingModal from '../../components/tagging-modal/TaggingModal';

const initialState = {
    scene: null,
    updateList: [],
};

const ThreeState = createContext(initialState);

const ThreeDispatch = createContext();

export const ThreeEditorActionEnums = {
    SET_SCENE: 'SET_SCENE',
    SET_UPDATE_LIST: 'SET_UPDATE_LIST',
    CLEAR_UPDATE_LIST: 'CLEAR_UPDATE_LIST',
};

const { SET_SCENE, SET_UPDATE_LIST, CLEAR_UPDATE_LIST } = ThreeEditorActionEnums;

const ThreeEditorReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SCENE:
            return (
                {
                    ...state,
                    scene: payload,
                }
            );
        case SET_UPDATE_LIST:
            return (
                {
                    ...state,
                    updateList: [...state.updateList, ...payload],
                });
        case CLEAR_UPDATE_LIST:
            return (
                {
                    ...state,
                    updateList: [],
                });
        default:
            console.error(`Action of type ${type} not supported!`);
            return state;
    }
};

export const ThreeEditor = ({ children }) => {
    const [threeReady, setThreeReady] = useState(false);
    const [state, dispatch] = useReducer(ThreeEditorReducer, initialState);

    const { updateList } = state;

    const [colliderState, colliderDispatch] = useCollisionManager();
    const [, UIDispatch] = useUIManager();
    // useRef used to prevent ThreeEditor from losing variable references.
    const canvasContainerRef = useRef();
    const rendererRef = useRef(new THREE.WebGLRenderer());
    const cameraRef = useRef();
    const sceneRef = useRef(new THREE.Scene());
    const clock = new THREE.Clock();

    const updateRef = useRef(updateList);

    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());
    const colliderRef = useRef(colliderState.colliders);

    const renderer = rendererRef.current;
    const scene = sceneRef.current;

    const animate = (controllerUpdate) => {
        requestAnimationFrame(() => animate(controllerUpdate));
        renderer.render(scene, cameraRef.current);
        const deltaTime = clock.getDelta();

        if (controllerUpdate) {
            controllerUpdate();
        }

        // Need to use ref in animate function because animate doesn't have access to state
        updateRef.current.forEach((element) => {
            if (element) {
                if (element.disposed) {
                    element = null; // eslint-disable-line
                } else {
                    element.update(deltaTime, clock.elapsedTime);
                }
            }
        });
    };

    // Possible move this down a layer in the future to make mouse down events more extensible
    const onMouseDown = (ev) => {
        if (ev.button !== 2 || ev.target.tagName !== 'CANVAS') {
            return;
        }

        const {
            top, left, width, height,
        } = rendererRef.current.domElement.getBoundingClientRect();

        mouseRef.current.x = -1 + 2 * (ev.clientX - left) / width; // eslint-disable-line
        mouseRef.current.y = 1 - 2 * (ev.clientY - top) / height; // eslint-disable-line

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(colliderRef.current);

        const { point } = intersects[0];
        if (intersects[0].object.name === 'marker') {
            intersects[0].object.onClick();
            return;
        }

        const componentToRender = (props) => <TaggingModal {...props} />; // eslint-disable-line
        const marker = new ThreeProductMarker(componentToRender, {});
        marker.addToScene(sceneRef.current);
        marker.setUIDispatcher(UIDispatch);
        marker.setColliderDispatcher(colliderDispatch);
        marker.collider.name = 'marker';

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: marker.collider,
        });
        marker.setPosition(point.x, point.y, point.z);

        marker.renderComponentImmediately();
    };

    const preventContextMenu = (e) => {
        if (e.target.id === 'modal-overlay') {
            e.preventDefault();
            return false;
        }
        return true;
    };

    useEffect(() => {
        dispatch({
            type: SET_SCENE,
            payload: scene,
        });

        const canvasContainer = canvasContainerRef.current;
        const aspectRatio = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        // set new reference for cameraRef.current here
        cameraRef.current = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000);
        const controls = new OrbitControls(cameraRef.current, renderer.domElement);

        const windowResizeHandler = () => {
            const currentAspectRatio = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
            cameraRef.current.aspect = currentAspectRatio;
            cameraRef.current.updateProjectionMatrix();
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        };

        setupRenderer(rendererRef.current, canvasContainer);
        setupCamera(aspectRatio, cameraRef.current);
        setupControls(controls);

        window.addEventListener('resize', windowResizeHandler);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('contextmenu', preventContextMenu);

        scene.add(cameraRef.current);
        clock.start();
        animate(controls.update);
        setThreeReady(true);
        return () => {
            window.removeEventListener('resize', windowResizeHandler);
            window.removeEventListener('mousedown', onMouseDown);

            controls.dispose();
            scene.dispose();
            renderer.dispose();
            updateList.length = 0;
        };
    }, []); // eslint-disable-line

    useEffect(() => {
        updateRef.current = updateList;
    }, [updateList]);

    useEffect(() => {
        colliderRef.current = colliderState.colliders;
    });

    return (
        <div
            id="canvas-wrapper"
            style={{
                width: '100%',
                height: '100%',
            }}
            ref={canvasContainerRef}
        >
            <ThreeState.Provider value={state}>
                <ThreeDispatch.Provider value={dispatch}>
                    {threeReady && children}
                </ThreeDispatch.Provider>
            </ThreeState.Provider>
        </div>
    );
};

export const useThree = () => {
    const state = useContext(ThreeState);
    const dispatch = useContext(ThreeDispatch);
    return [state, dispatch];
};
