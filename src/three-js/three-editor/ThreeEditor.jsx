import React, {
    useState, useEffect, useRef, createContext, useReducer, useContext,
} from 'react';
import { useSelector } from "react-redux";
import * as THREE from 'three';

import OrbitControls from '../three-controls/OrbitControls';
import { setupRenderer, setupCamera, setupControls } from './setupThreeEditor';
import { threeEditorMouseEvents } from './threeEditorMouseEvents';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';
import ThreeProductMarker from '../hotspot-marker/ThreeProductMarker';
import ThreeProductImage from '../hotspot-marker/ThreeProductImage';
import { useUIManager, UIManagerEnums } from '../ui-manager/UIManager';
import TaggingModal from '../../components/tagging-modal/TaggingModal';
import { useDataManager } from '../data-manager/DataManager';
import ProductImageControls from '../../components/product-image-controls/ProductImageControls';
import LoadingScreen from '../../components/loading-screen/LoadingScreen';
import ThreeLoadingManager from '../three-loading-manager/three-loading-manager';

import {
    SET_LOADING,
    SET_SCENE,
    SET_UPDATE_LIST,
    CLEAR_UPDATE_LIST,
    SET_MAX_RENDER_ORDER,
} from './threeEditorActionEnums';

const initialState = {
    isLoading: false,
    scene: null,
    updateList: [],
    maxRenderOrder: 1,
};

const ThreeState = createContext(initialState);

const ThreeDispatch = createContext();

//TODO: move all reducers in src/store/reducers!!!

const ThreeEditorReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return ({
                ...state,
                isLoading: payload,
            });
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
        case SET_MAX_RENDER_ORDER:
            return (
                {
                    ...state,
                    maxRenderOrder: payload,
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
    const [UIState, UIDispatch] = useUIManager();
    const [dataState] = useDataManager();
    const { products, mode, isEnabled } = useSelector(state => state.productLibrary);
    const { currentSceneId } = useSelector(state => state['SceneEditor']);

    const { updateList } = state;

    // useRef used to prevent ThreeEditor from losing variable references.
    const canvasContainerRef = useRef();
    const rendererRef = useRef(new THREE.WebGLRenderer());
    const cameraRef = useRef();
    const controlsRef = useRef();
    const sceneRef = useRef(new THREE.Scene());
    const clock = new THREE.Clock();

    const updateRef = useRef(updateList);

    const raycasterRef = useRef(new THREE.Raycaster());
    const colliderRef = useRef(colliderState.colliders);

    const mouseRef = useRef(new THREE.Vector2());
    const mouseStartRef = useRef(new THREE.Vector2());

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    ThreeLoadingManager.setOnLoad(dispatch);

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

    const renderProductMarker = (colliderTransform, visualTransform, renderProps = {}) => {
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

    const setMaxRenderOrder = (renderOrder) => {
        if (renderOrder >= state.maxRenderOrder) {
            dispatch({
                type: SET_MAX_RENDER_ORDER,
                payload: renderOrder + 1,
            });
        }
    };

    const renderProductImageMarker = (colliderTransform, visualTransform, renderProps = {}) => {
        const componentToRender = (props) => <ProductImageControls {...props} />; // eslint-disable-line
        const marker = new ThreeProductImage(
            componentToRender, renderProps, colliderTransform, visualTransform,
        );

        marker.addToScene(sceneRef.current);
        marker.setUIDispatcher(UIDispatch);
        marker.setColliderDispatcher(colliderDispatch);

        if (renderProps.renderOrder) {
            setMaxRenderOrder(renderProps.renderOrder);
        }

        return marker;
    };

    const addProductImage = (e) => {
        e.preventDefault();
        const imageId = e.dataTransfer.getData('id');
        const folderId = e.dataTransfer.getData('folderId');
        const imageUrl = e.dataTransfer.getData('imageUrl');

        if (!imageId && !imageUrl) return;

        const marker = renderProductImageMarker(undefined, undefined, {
            renderOrder: state.maxRenderOrder,
            imageId,
            folderId,
            imageUrl,
        });

        // Set Position to in front of camera
        const pos = new THREE.Vector3(0, 0, -8);
        pos.applyQuaternion(cameraRef.current.quaternion);
        marker.setPosition(pos.x, pos.y, pos.z);
        marker.setRenderOrder(state.maxRenderOrder);

        // Add Colliders
        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: marker.sceneObject,
        });

        // Removes existing UIs
        UIDispatch({
            type: UIManagerEnums.RESET_UIS,
        });

        marker.renderComponentImmediately();
    };

    useEffect(() => {
        dispatch({
            type: SET_SCENE,
            payload: scene,
        });

        const canvasContainer = canvasContainerRef.current;
        const widthMultiplier = 1;
        const heightMultiplier = 1;
        const aspectRatio = (canvasContainer.offsetWidth * widthMultiplier)
            / (canvasContainer.offsetHeight * heightMultiplier);
        // set new reference for cameraRef.current here
        cameraRef.current = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000);
        controlsRef.current = new OrbitControls(cameraRef.current, renderer.domElement);

        const windowResizeHandler = () => {
            const currentAspectRatio = (canvasContainer.offsetWidth * widthMultiplier)
                / (canvasContainer.offsetHeight * heightMultiplier);
            cameraRef.current.aspect = currentAspectRatio;
            cameraRef.current.updateProjectionMatrix();
            renderer.setSize((canvasContainer.offsetWidth * widthMultiplier),
                (canvasContainer.offsetHeight * heightMultiplier));
        };

        setupRenderer(rendererRef.current, canvasContainer, widthMultiplier, heightMultiplier);
        setupCamera(aspectRatio, cameraRef.current);
        setupControls(controlsRef.current);

        window.addEventListener('resize', windowResizeHandler);

        scene.add(cameraRef.current);
        clock.start();
        animate(controlsRef.current.update);
        setThreeReady(true);
        return () => {
            window.removeEventListener('resize', windowResizeHandler);

            controlsRef.current.dispose();
            scene.dispose();
            renderer.dispose();
            updateList.length = 0;
        };
    }, [currentSceneId]); // eslint-disable-line

    useEffect(() => {
        // mouse event listeners
        const {
            addThreeEditorMouseEventListeners,
            removeThreeEditorMouseEventListeners,
        } = threeEditorMouseEvents(
            renderer,
            controlsRef.current,
            mouseStartRef,
            mouseRef,
            cameraRef,
            raycasterRef,
            colliderRef,
            renderProductMarker,
            colliderDispatch,
            CollisionManagerActionEnums,
            currentSceneId,
            UIState,
            UIDispatch,
            UIManagerEnums,
            mode,
        );

        addThreeEditorMouseEventListeners();

        // Removes existing UIs
        UIDispatch({
            type: UIManagerEnums.RESET_UIS,
        });

        return removeThreeEditorMouseEventListeners;
    }, [currentSceneId, mode]); // eslint-disable-line

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

            // Removes existing UIs
            UIDispatch({
                type: UIManagerEnums.RESET_UIS,
            });
        };

        const renderMarker = (object) => {
            if (object.hotspot_type === 'product_image') {
                const product = products.find((p) => p.id === object.image_id);

                if (!product || !isEnabled) return false;

                dispatch({
                    type: SET_LOADING,
                    payload: true,
                });

                return renderProductImageMarker(
                    object.collider_transform,
                    object.transform,
                    {
                        type: object.hotspot_type,
                        id: object.id,
                        scale: object.scale,
                        imageUrl: product.imageUrl,
                        renderOrder: object.renderOrder,
                    },
                );
            }

            return renderProductMarker(
                object.collider_transform,
                object.transform,
                {
                    type: object.hotspot_type,
                    id: object.id,
                    productSKU: object.sku,
                },
            );
        };

        const setNewRoomObjectData = () => {
            if (dataState.roomObjectData && products) {
                dataState.roomObjectData.forEach((object) => {
                    const marker = renderMarker(object);

                    if (!marker) return;
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
    }, [currentSceneId, dataState, products]); // eslint-disable-line

    useEffect(() => {
        const hasProductImage = (collider) => {
            const { modalComponentRenderProps: renderProps } = collider.owner;

            if (renderProps.type === 'product_image') {
                return products.find((product) => (
                    product.imageUrl === collider.owner.modalComponentRenderProps.imageUrl
                ));
            }

            return true;
        };

        const resetProducts = () => {
            colliderRef.current.forEach((collider) => {
                if (collider.name === 'marker' && !hasProductImage(collider)) {
                    colliderDispatch({
                        type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
                        payload: collider.uuid,
                    });
                    collider.owner.dispose();
                }
            });
        };

        resetProducts();
    }, [products]);

    return (
        <div
            id="canvas-wrapper"
            style={{
                width: '100%',
                height: '100%',
            }}
            ref={canvasContainerRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={addProductImage}
        >
            <ThreeState.Provider value={state}>
                <ThreeDispatch.Provider value={dispatch}>
                    {threeReady && children}
                    {state.isLoading && <LoadingScreen />}
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
