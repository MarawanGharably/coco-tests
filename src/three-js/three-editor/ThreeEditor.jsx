import React, { useState, useEffect, useRef, createContext, useReducer, useContext} from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as THREE from 'three';
import ThreeController from '../three-controls/ThreeController';
import { setupRenderer, setupCamera } from './setupThreeEditor';
import { threeEditorMouseEvents } from './threeEditorMouseEvents';
import LoadingScreen from '../../components/LoadingScreen';
import { useCollisionManager, CollisionManagerActionEnums } from '../_DataManagers/CollisionManager';
import ThreeLoadingManager from '../_DataManagers/three-loading-manager';
import ThreeEditorReducer from '../../store/reducers/ThreeEditorReducer';
import { setMaxRenderOrderAction, setSceneAction} from "../../store/actions/ThreeEditorActions";
import { renderProductImageMarker, renderProductMarker } from '../../components/Scene/SceneEditor/utils';

import {RESET_DELETE_PRODUCT_ID} from "../../store/types/productLibrary";
import styles from './ThreeEditor.module.scss';
import {Background, ColliderSphere} from "../three-background";


const initialState = {
    isLoading: false,
    scene: null,
    maxRenderOrder: 1,
};

const ThreeState = createContext(initialState);



export const ThreeEditor = (props) => {
    const { sceneRef, sceneObjects, allowEventsForMarkerTypeOnly, children  } = props;
    const { products, mode, deleteProductId } = useSelector(state => state['productLibrary']);
    const { currentSceneId } = useSelector(state => state['SceneEditor']);
    const reduxDispatch = useDispatch();

    const [threeReady, setThreeReady] = useState(false);
    const [state, dispatch] = useReducer(ThreeEditorReducer, initialState);
    const [colliderState, colliderDispatch] = useCollisionManager();
    const [UI, setUI] = useState();


    sceneRef.current.setUI=setUI;

    console.log('-sceneRef', sceneRef);

    // useRef used to prevent ThreeEditor from losing variable references.
    const canvasContainerRef = useRef();
    const rendererRef = useRef(new THREE.WebGLRenderer());
    const cameraRef = useRef();
    const controlsRef = useRef();
    // const sceneRef = useRef(new THREE.Scene());
    const clock = new THREE.Clock();

     const colliderRef = useRef(colliderState.colliders);
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    ThreeLoadingManager.setOnLoad(dispatch);




    const animate = (controllerUpdate) => {
        requestAnimationFrame(() => animate(controllerUpdate));
        renderer.render(scene, cameraRef.current);

        if (controllerUpdate) controllerUpdate();
    };


    const setMaxRenderOrder = (renderOrder) => {
        if (renderOrder >= state.maxRenderOrder) {
            dispatch(setMaxRenderOrderAction(renderOrder + 1));
        }
    };


    useEffect(() => {
        dispatch(setSceneAction(scene));

        const canvasContainer = canvasContainerRef.current;
        const width = canvasContainer.offsetWidth ;
        const height = canvasContainer.offsetHeight;
        const aspectRatio = width / height;

        // set new reference for cameraRef.current here
        cameraRef.current = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 1000);
        controlsRef.current = ThreeController.setupControls(cameraRef.current, renderer);

        setupRenderer(rendererRef.current, canvasContainer);
        setupCamera(aspectRatio, cameraRef.current);

        scene.add(cameraRef.current);
        clock.start();
        animate(controlsRef.current.update);
        setThreeReady(true);



        return () => {
            controlsRef.current.dispose();
            scene.dispose();
            renderer.dispose();
            // renderer.forceContextLoss();//test
            // forceContextLoss()
            setUI(false); //Hide UI Modal
        };
    }, [currentSceneId]); // eslint-disable-line


    useEffect(() => {
        const canvasContainer = canvasContainerRef.current;

        // mouse event listeners
        const {
            addThreeEditorMouseEventListeners,
            removeThreeEditorMouseEventListeners,
        } = threeEditorMouseEvents(
            renderer,
            controlsRef,
            cameraRef,
            colliderRef,
            canvasContainer,
            mode,
            allowEventsForMarkerTypeOnly,
            props.onMouseDown,
            props.onMouseUp,
            props.onMouseMove
        );

        if(UI?.Component) setUI(false); //Hide UI Modal

        addThreeEditorMouseEventListeners();


        return ()=>{
            removeThreeEditorMouseEventListeners();
        };
    }, [currentSceneId, mode]); // eslint-disable-line



    useEffect(() => {
        colliderRef.current = colliderState.colliders;
    }, [colliderState]);

    //Render Scene objects
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


        const renderMarker = (object) => {
            if (object.props.hotspot_type === 'product_image') {
                return renderProductImageMarker(object, sceneRef,  colliderDispatch, setMaxRenderOrder);
            }

            return renderProductMarker( object, sceneRef,  colliderDispatch );
        };

        const setNewRoomObjectData = () => {
            if (sceneObjects && products) {
                sceneObjects.forEach((object) => {
                    const marker = renderMarker(object);

                    if (!marker) return;
                    //TODO: transform props should be set on marker init
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
    }, [currentSceneId, sceneObjects]); // eslint-disable-line
    // }, [currentSceneId]); // eslint-disable-line



    // Product Image removed? Delete associated hotspots
    useEffect(() => {
        if(deleteProductId && deleteProductId.length>5 && typeof deleteProductId === 'string' ){
            const imageHotspots = colliderRef.current.filter(collider=> (collider.name =='marker' && collider.owner.modalComponentRenderProps.type ==='product_image'));
            const hotspotsToDelete = imageHotspots.filter(collider=>collider.owner.modalComponentRenderProps.image._id == deleteProductId );

            hotspotsToDelete.forEach((collider) => {
                colliderDispatch({
                    type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
                    payload: collider.uuid,
                });
                collider.owner.dispose();
            });

            //Dont forget to cleanup deleteProductId value
            reduxDispatch({type:RESET_DELETE_PRODUCT_ID});
        }
    }, [deleteProductId]);


    // console.log('--ThreeEditor', {UI, scene});

    return (
        <div
            id="canvas-wrapper"
            className={styles['canvas-wrapper']}
            ref={canvasContainerRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={e=>props.onDrop(e, cameraRef, state.maxRenderOrder, colliderDispatch,   sceneRef, setMaxRenderOrder)}
        >
            <ThreeState.Provider value={{state, dispatch}}>

                {threeReady && (<>
                    <ColliderSphere />
                    <Background />
                </>)}

                {state.isLoading && <LoadingScreen />}


                <div id='canvasUI' className={`${styles['canvasUI']} ${UI ? styles['active']: ''}`} style={UI?.style} >
                    {UI && <UI.Component {...UI?.props} sceneRef={sceneRef} />}
                </div>

            </ThreeState.Provider>
        </div>
    );
};

export const useThree = () => {
    const {state, dispatch} = useContext(ThreeState);
    return [state, dispatch];
};
