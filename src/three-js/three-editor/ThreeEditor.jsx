import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import ThreeController from '../three-controls/ThreeController';
import { setupRenderer, setupCamera } from './setupThreeEditor';
import { threeEditorMouseEvents } from './threeEditorMouseEvents';
import { renderImageHotspotRecord, renderProductHotspotRecord } from '../../components/Scene/SceneEditor/utils';
import styles from './ThreeEditor.module.scss';
import { Background, ColliderSphere } from '../three-background';


//TODO: remove mode


  const ThreeEditor = (props) => {
    const { sceneId, sceneData, mode, allowEventsForMarkerTypeOnly, children } = props;
    const [threeReady, setThreeReady] = useState(false);
    const [maxRenderOrder, setMaxRenderOrderAction] = useState(1);
    const [UI, setUI] = useState();

    //Scene
    const sceneRef = useRef(new THREE.Scene());
    const scene = sceneRef.current;

    //Renderer
    const rendererRef = useRef(new THREE.WebGLRenderer());
    let renderer = rendererRef.current;

    // Stringify children keys to prevent re-rendering
    const childrenIds = children.map( child => child.key).filter(v => v !== null).join("__");





    // useRef used to prevent ThreeEditor from losing variable references.
    const canvasContainerRef = useRef();
    const cameraRef = useRef();
    const controlsRef = useRef();
    const clock = new THREE.Clock();
    sceneRef.current.setUI = setUI;

    const setMaxRenderOrder = (renderOrder) => {
        if (renderOrder >= maxRenderOrder) setMaxRenderOrderAction(renderOrder + 1);
    };


      const animate = (controllerUpdate) => {
          requestAnimationFrame(() => animate(controllerUpdate));
          renderer.render(scene, cameraRef.current);

          if (controllerUpdate) controllerUpdate();
      };



    //Scene INIT
    useEffect(() => {
        const canvasContainer = canvasContainerRef.current;
        const width = canvasContainer.offsetWidth;
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
            //cameraRef.current.dispose();

            setUI(false); //Hide UI Modal when scene changed
        };
    }, [sceneId]);


    //Events
    useEffect(() => {
        const canvasContainer = canvasContainerRef.current;

        // mouse event listeners
        const { addThreeEditorMouseEventListeners, removeThreeEditorMouseEventListeners } = threeEditorMouseEvents(
            sceneRef,
            renderer,
            controlsRef,
            cameraRef,
            canvasContainer,
            mode,
            allowEventsForMarkerTypeOnly,
            props.onMouseDown,
            props.onMouseUp,
            props.onMouseMove
        );

        addThreeEditorMouseEventListeners();

        return () => {
            removeThreeEditorMouseEventListeners();

        };
    // }, [sceneId, mode, scene, renderer, controlsRef]); // eslint-disable-line
    }, [sceneRef, cameraRef, mode]); // eslint-disable-line
   


      //windowResizer placed separately because it requires to track and call UI & setUI
      //while at same time we DO NOT WANT to remount all events each time when UI changed
      //reminder: UI changed on each on scene click
      useEffect(()=>{
          const canvasContainer = canvasContainerRef.current;

          const windowResizeHandler = () => {
              const width = canvasContainer.offsetWidth;
              const height = canvasContainer.offsetHeight;

              cameraRef.current.aspect = width / height;
              cameraRef.current.updateProjectionMatrix();
              renderer.setSize(width, height);

              if(UI) setUI(false); //destroy UI
          };
          window.addEventListener('resize', windowResizeHandler);

          return()=>{
              window.removeEventListener('resize', windowResizeHandler);
          }
      },[sceneId, UI])

    //Scene Children
    useEffect(() => {
        console.log('%c- INIT Scene children', 'color:green', { children, sChildren:scene.children, sceneRef });
        const removeSceneHotspots=()=>{
            let total = 0;
            let idx = 0;
            while (scene.children.some((item) => ['visualObject', 'marker'].includes(item.name))) {
                // console.log('-loop start',  );
                const collider = scene.children[idx];
                if (['visualObject', 'marker'].includes(collider.name)) {
                    if (collider.dispose) collider.dispose();
                    // collider.owner.dispose();
                    sceneRef.current.remove(scene.children[idx]);
                    total ++;
                } else {
                    // console.log('-loop continue', {sChildren:scene.children});
                    idx++;
                }
            }
            console.log(`__TOTAL removed:${total}`, {sCHildr: JSON.parse(JSON.stringify(scene.children))});
        }

        const loadSceneObjects =()=>{
            let total = 0;
            children?.forEach((item) => {
                // console.log('-item', item.props);
                const { type, hotspot_type } = item.props;

                if (type == 'hotspot' && hotspot_type == 'hotspot') {
                    const object = item.props;
                    renderProductHotspotRecord(object, sceneRef);
                    total++;
                } else if (type == 'hotspot' && hotspot_type == 'image_hotspot') {
                    const object = item.props;
                    renderImageHotspotRecord(object, sceneRef, setMaxRenderOrder);
                    total++;
                }
            });
            console.log('__TOTAL loaded:', total);
        }


        removeSceneHotspots();//Remove Scene colliders/objects ( markers elements)
        loadSceneObjects(); //Load New Scene Objects


        return () => {
            console.log('%c- INIT Children __cleanup', 'color:red', { children, scene:sceneRef.current });
        };
    // }, [ sceneId, children]);
    }, [ childrenIds]);
      //string of children keys used to prevent re-rendering,
      // Dont forget to always use unique component key





    return (
        <div
            id="canvas-wrapper"
            className={styles['canvas-wrapper']}
            ref={canvasContainerRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => props.onDrop(e, cameraRef, maxRenderOrder, scene, setMaxRenderOrder)}
        >
            {threeReady && (<>
                    <ColliderSphere scene={scene} />
                    <Background sceneData={sceneData} scene={scene} />
                </>)}

            <div id="canvasUI" className={`${styles['canvasUI']} ${UI ? styles['active'] : ''}`} style={UI?.style}>
                {UI && <UI.Component {...UI?.props} sceneRef={sceneRef} />}
            </div>
        </div>
    );
};



export default ThreeEditor;

// export default React.memo(ThreeEditor, (prev, next) => {
//     if(prev.mode === next.mode) return true;
//     return prev.children.length === next.children.length;
// });