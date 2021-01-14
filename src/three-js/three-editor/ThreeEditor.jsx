import React, {
    useState, useEffect, useRef, createContext, useReducer, useContext,
} from 'react';
import * as THREE from 'three';

import OrbitControls from '../three-controls/OrbitControls';
import { setupRenderer, setupCamera, setupControls } from './setupThreeEditor';
import { threeEditorMouseEvents } from './threeEditorMouseEvents';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';
import ThreeProductMarker from '../hotspot-marker/ThreeProductMarker';
import { useUIManager } from '../ui-manager/UIManager';
import TaggingModal from '../../components/tagging-modal/TaggingModal';
import { useEditorDataStore } from '../../data-store/editor-data-store/EditorDataStore';
import { useDataManager } from '../data-manager/DataManager';

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

    const [colliderState, colliderDispatch] = useCollisionManager();
    const [, UIDispatch] = useUIManager();
    const [dataState] = useDataManager();
    const [editorState] = useEditorDataStore();
    const { currentSceneId } = editorState;
    const { updateList } = state;

    // useRef used to prevent ThreeEditor from losing variable references.
    const canvasContainerRef = useRef();
    const rendererRef = useRef(new THREE.WebGLRenderer());
    const cameraRef = useRef();
    const sceneRef = useRef(new THREE.Scene());
    const clock = new THREE.Clock();

    const updateRef = useRef(updateList);

    const raycasterRef = useRef(new THREE.Raycaster());
    const colliderRef = useRef(colliderState.colliders);

    const mouseRef = useRef(new THREE.Vector2());
    const mouseStartRef = useRef(new THREE.Vector2());

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

    const renderMarker = (colliderTransform, visualTransform, renderProps = {}) => {
        const componentToRender = (props) => <TaggingModal {...props} />; // eslint-disable-line
        const marker = new ThreeProductMarker(
            componentToRender, renderProps, colliderTransform, visualTransform,
        );
        marker.addToScene(sceneRef.current);
        marker.setScale();
        marker.setUIDispatcher(UIDispatch);
        marker.setColliderDispatcher(colliderDispatch);

        return marker;
    };

    useEffect(() => {
        dispatch({
            type: SET_SCENE,
            payload: scene,
        });

        const canvasContainer = canvasContainerRef.current;
        const widthMultiplier = 1;
        const heightMultiplier = 1.1;
        const aspectRatio = (canvasContainer.offsetWidth * widthMultiplier)
            / (canvasContainer.offsetHeight * heightMultiplier);
        // set new reference for cameraRef.current here
        cameraRef.current = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000);
        const controls = new OrbitControls(cameraRef.current, renderer.domElement);

        const windowResizeHandler = () => {
            const currentAspectRatio = (canvasContainer.offsetWidth * widthMultiplier)
                / (canvasContainer.offsetHeight * heightMultiplier);
            cameraRef.current.aspect = currentAspectRatio;
            cameraRef.current.updateProjectionMatrix();
            renderer.setSize((canvasContainer.offsetWidth * widthMultiplier),
                (canvasContainer.offsetHeight * heightMultiplier));
        };

        // mouse event listeners
        const {
            addThreeEditorMouseEventListeners,
            removeThreeEditorMouseEventListeners,
        } = threeEditorMouseEvents(
            renderer,
            controls,
            mouseStartRef,
            mouseRef,
            canvasContainerRef,
            cameraRef,
            raycasterRef,
            colliderRef,
            renderMarker,
            colliderDispatch,
            CollisionManagerActionEnums,
        );

        setupRenderer(rendererRef.current, canvasContainer, widthMultiplier, heightMultiplier);
        setupCamera(aspectRatio, cameraRef.current);
        setupControls(controls);

        window.addEventListener('resize', windowResizeHandler);
        addThreeEditorMouseEventListeners();

        scene.add(cameraRef.current);
        clock.start();
        animate(controls.update);
        setThreeReady(true);
        return () => {
            window.removeEventListener('resize', windowResizeHandler);
            removeThreeEditorMouseEventListeners();

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
    }, [colliderState]);

    useEffect(() => {
        const resetRoomObjects = () => {
            colliderRef.current.forEach((collider) => {
                if (collider.name === 'marker') {
                    colliderDispatch({
                        type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
                        payload: collider.uuid,
                    });
                    collider.owner.dispose();
                }
            });
        };

        const setNewRoomObjectData = () => {
            if (dataState.roomObjectData) {
                dataState.roomObjectData.forEach((object) => {
                    const marker = renderMarker(
                        object.collider_transform,
                        object.transform,
                        {
                            productSKU: object.sku,
                            id: object.id,
                        },
                    );
                    marker.setTransform(object.collider_transform, object.transform);
                    colliderDispatch({
                        type: CollisionManagerActionEnums.SET_COLLIDERS,
                        payload: marker.sceneObject,
                    });
                });
            }
        };

        resetRoomObjects();
        setNewRoomObjectData();
    }, [currentSceneId, dataState]); // eslint-disable-line

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
