import React, { useState, useEffect, useRef, createContext, useReducer, useContext} from 'react';
import { useSelector } from "react-redux";
import * as THREE from 'three';
import ThreeController from '../three-controls/ThreeController';
import { setupRenderer, setupCamera } from './setupThreeEditor';
import { threeEditorMouseEvents } from './threeEditorMouseEvents';
import TaggingModal from '../../components/tagging-modal/TaggingModal';
import LoadingScreen from '../../components/LoadingScreen';

import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';
import { useUIManager, UIManagerEnums } from '../ui-manager/UIManager';
import { useDataManager } from '../data-manager/DataManager';

import ThreeLoadingManager from '../three-loading-manager/three-loading-manager';
import ThreeEditorReducer from '../../store/reducers/ThreeEditorReducer';
import { setMaxRenderOrderAction, setSceneAction} from "../../store/actions/ThreeEditorActions";

import {HotspotMarker} from '../_constructors/Markers';
import {ProductObject, addProductImageOnDrop, renderProductImageMarker } from '../utils/productHotspotHelpers';
import styles from './ThreeEditor.module.scss';


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
            id: object?.['_id'],
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





    const setMaxRenderOrder = (renderOrder) => {
        if (renderOrder >= state.maxRenderOrder) {
            dispatch(setMaxRenderOrderAction(renderOrder + 1));
        }
    };




    useEffect(() => {
        dispatch(setSceneAction(scene));

        const canvasContainer = canvasContainerRef.current;
        const widthMultiplier = 1;
        const heightMultiplier = 1;
        const width = canvasContainer.offsetWidth * widthMultiplier;
        const height = canvasContainer.offsetHeight * heightMultiplier;

        const aspectRatio = width / height;
        // set new reference for cameraRef.current here
        cameraRef.current = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000);
        controlsRef.current = ThreeController.setupControls(cameraRef.current, renderer);

        const windowResizeHandler = () => {
            const width = canvasContainer.offsetWidth * widthMultiplier;
            const height = canvasContainer.offsetHeight * heightMultiplier;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            renderer.setSize(width, height);
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
            // console.log('>renderMarker', <object data="" type=""></object>);

            if (object.props.hotspot_type === 'product_image') {

                const productObj = new ProductObject({
                    id:object._id,
                    image:object?.props?.image,
                    renderOrder:object.props.renderOrder,
                    scale:object.props.scale,
                    transform:object.transform,
                    collider_transform:object.collider_transform,
                });
                // console.log('>render product image  ', productObj);
                return renderProductImageMarker(productObj, sceneRef, UIDispatch, colliderDispatch, setMaxRenderOrder);
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
            // console.log('>useEffect', {products});
            if (renderProps.type === 'product_image') {
                const allProducts = Object.entries(products).map(([folderId, records])=>records);
                // console.log('>allProducts', allProducts);

                //TODO: product has no imageUrl prop
                return allProducts.find((product) => (
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
            onDrop={e=>addProductImageOnDrop(e, cameraRef, selectedFolder.value, products, state.maxRenderOrder, colliderDispatch, UIDispatch, sceneRef, setMaxRenderOrder)}
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
