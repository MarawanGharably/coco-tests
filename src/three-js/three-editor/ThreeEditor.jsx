import React, { useState, useEffect, useRef, createContext, useReducer, useContext} from 'react';
import { useSelector } from "react-redux";
import * as THREE from 'three';
import ThreeController from '../three-controls/ThreeController';
import { setupRenderer, setupCamera } from './setupThreeEditor';
import { threeEditorMouseEvents } from './threeEditorMouseEvents';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';

import {HotspotMarker, ThreeProductImage} from '../_constructors/Markers';

import { useUIManager, UIManagerEnums } from '../ui-manager/UIManager';
import TaggingModal from '../../components/tagging-modal/TaggingModal';
import { useDataManager } from '../data-manager/DataManager';
import ProductImageControls from '../../components/Scene/product-library/product-image-controls/ProductImageControls';
import LoadingScreen from '../../components/LoadingScreen';
import ThreeLoadingManager from '../three-loading-manager/three-loading-manager';
import ThreeEditorReducer from '../../store/reducers/ThreeEditorReducer';
import {setLoadingAction, setMaxRenderOrderAction, setSceneAction} from "../../store/actions/ThreeEditorActions";
import styles from './ThreeEditor.module.scss';
import { formURL } from "../../utils/urlHelper";

const initialState = {
    isLoading: false,
    scene: null,
    updateList: [],
    maxRenderOrder: 1,
};

const ThreeState = createContext(initialState);
const ThreeDispatch = createContext();


export const ThreeEditor = ({ storeId, children }) => {
    const [threeReady, setThreeReady] = useState(false);
    const [state, dispatch] = useReducer(ThreeEditorReducer, initialState);

    const [colliderState, colliderDispatch] = useCollisionManager();
    const [UIState, UIDispatch] = useUIManager();
    const [dataState] = useDataManager();
    const { selectedFolder, products, mode, isEnabled } = useSelector(state => state.productLibrary);
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


    const renderProductMarker = (object={}) => {
        const {collider_transform , transform } = object;
        const renderProps={
            type: object?.props?.hotspot_type,
            id: object?.['_id']?.['$oid'],
            productSKU: object?.props?.product_sku,
        }
        const componentToRender = (props) => <TaggingModal {...props} />; // eslint-disable-line
        const marker = new HotspotMarker(componentToRender, renderProps, collider_transform, transform);
        marker.addToScene(sceneRef.current);
        marker.setScale();
        marker.setUIDispatcher(UIDispatch);
        marker.setColliderDispatcher(colliderDispatch);

        return marker;
    };

    const getProductImageMarkerRenderProps = (object) => {
        const { isFromDrop } = object;
        if (isFromDrop) {
            // Construct props if the object is rendered from drag and drop
            return {
                // id: object.imageId,
                imageId: object.imageId,
                image: object.image,
                renderOrder: object.renderOrder,
                type: 'product_image'
            };
        } else {
            // Construct props for object rendered from existing DB object
            return {
                type: object.props.hotspot_type,
                id: object._id,
                image: object?.props && object.props.image,
                renderOrder: object.props.renderOrder,
            }
        }

    }

    const renderProductImageMarker = (object={}) => {
        const {collider_transform, transform} = object;



        //render existing object. New object provides imageUrl prop.
        // if(object.id && !object?.imageUrl){
        //     const product = products.find((p) => p.id === object.image_id);
        //     if (!product || !isEnabled) return false;
        //     dispatch(setLoadingAction(true));
        //     object.imageUrl = product.imageUrl;
        // }

        const renderProps = getProductImageMarkerRenderProps(object);
        // const renderProps={
        //     type: object.hotspot_type || 'product_image', //optional
        //     id: object.id,//optional
        //     image: object?.props && object.props.image, //!present
        //     renderOrder: object.renderOrder,//!present
        // };

        // //optional props
        // if(object.folderId) renderProps.folderId = object.folderId;
        // if(object.imageId) renderProps.imageId = object.imageId;
        // if(object.scale) renderProps.scale = object.scale;


        const componentToRender = (props) => <ProductImageControls {...props} />;
        const marker = new ThreeProductImage(componentToRender, renderProps, collider_transform, transform);

        marker.addToScene(sceneRef.current);
        marker.setUIDispatcher(UIDispatch);
        marker.setColliderDispatcher(colliderDispatch);

        if (renderProps.renderOrder) {
            setMaxRenderOrder(renderProps.renderOrder);
        }

        return marker;
    };

    const setMaxRenderOrder = (renderOrder) => {
        if (renderOrder >= state.maxRenderOrder) {
            dispatch(setMaxRenderOrderAction(renderOrder + 1));
        }
    };



    const addProductImage = (e) => {
        e.preventDefault();
        const imageId = e.dataTransfer.getData('id');
        const folderId = e.dataTransfer.getData('folderId');

        const image = selectedFolder.products.find(item => item._id === imageId);

        // if (!imageId && !image) return;

        const marker = renderProductImageMarker({
            renderOrder:state.maxRenderOrder,
            imageId,
            folderId,
            image,
            isFromDrop: true
        });

        // Set Position to in front of camera
        const pos = new THREE.Vector3(0, 0, -10);
        pos.applyQuaternion(cameraRef.current.quaternion);
        marker.setPosition(pos.x, pos.y, pos.z);
        marker.lookAt();
        marker.setRenderOrder(state.maxRenderOrder);

        // Add Colliders
        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: marker.sceneObject,
        });

        // Removes existing UIs
        UIDispatch({type: UIManagerEnums.RESET_UIS});

        marker.renderComponentImmediately();
    };

    useEffect(() => {
        dispatch(setSceneAction(scene));

        const canvasContainer = canvasContainerRef.current;
        const widthMultiplier = 1;
        const heightMultiplier = 1;
        const aspectRatio = (canvasContainer.offsetWidth * widthMultiplier)
            / (canvasContainer.offsetHeight * heightMultiplier);
        // set new reference for cameraRef.current here
        cameraRef.current = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000);
        controlsRef.current = ThreeController.setupControls(cameraRef.current, renderer);

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
            storeId,
            renderer,
            controlsRef,
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
        UIDispatch({type: UIManagerEnums.RESET_UIS });

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
            UIDispatch({ type: UIManagerEnums.RESET_UIS });
        };

        const renderMarker = (object) => {
            if (object.props.hotspot_type === 'product_image') {
                object["isFromDrop"] = false;
                return renderProductImageMarker(object);
            }

            return renderProductMarker( object );
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
            className={styles['canvas-wrapper']}
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
