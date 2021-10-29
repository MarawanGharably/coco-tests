import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
    createAndRenderHotspotMarkerOnEvent,
    renderHotspotRecord,
    renderImageHotspotRecord
} from "../utils";
import {ImageMarker} from "../three-base-components/Markers";

//TODO: refactor setMaxRenderOrder
//TODO: object with hotspot_type =='image_marker' has prop sceneObject null???
function Hotspot(props) {
    const {type, transform, collider_transform, sceneRef, setMaxRenderOrder} = props;
    const markerRef = useRef();

    useEffect(()=>{

        const isNewRecord = !!(transform === undefined || transform?.length<1 || collider_transform === undefined || collider_transform?.length<1);
        const {e, point} = sceneRef.current.userData?.clickData || {};


        if(type == 'hotspot'){
            //new markers has no transform values. Currently interpreted as a new record
            if(transform === undefined || transform?.length<1 || collider_transform === undefined || collider_transform?.length<1){
                markerRef.current = createAndRenderHotspotMarkerOnEvent(e, props, point, sceneRef.current);
            }else{
                markerRef.current = renderHotspotRecord(props, sceneRef  );
            }
        }

        // Image Hotspot
        else if (type == 'image_hotspot') {
            if(isNewRecord){
                markerRef.current = createAndRenderImageHotspot(props, sceneRef, point);

            }else{
                markerRef.current = renderImageHotspotRecord(props, sceneRef, setMaxRenderOrder);
            }
        }

        return ()=>{
            markerRef.current.dispose();
            markerRef.current.components?.map(item=>item.dispose());
            markerRef.current.sceneObject?.dispose();
        }
    },[]);


    return false;
}

const createAndRenderImageHotspot =  (props, sceneRef, point)=>{
    //1. Create Image Marker
    const marker = new ImageMarker({
        imageURL:props.imageURL,
        renderOrder:props.renderOrder,
        scale:props.scale,
        userData: props.userData,
        UIConfig:props.UIConfig
    });

    //2. Render Marker
    marker.addToScene(sceneRef.current);

    //3. Set Position
    marker.setPosition(point.x, point.y, point.z);
    marker.lookAt();
    // marker.setUserData({imageId});

    //4. Get Transform data
    // const transforms = marker.getTransforms();
    // await sleep(1000); //Important!!! Do not delete sleep method from here!!!!!


    //7. Update marker.userData value
    // marker.setUserData(record);
    marker.onClick();
    return marker;
}


Hotspot.defaultProps = {
    type: 'hotspot', //hotspot/image_hotspot
};

Hotspot.propTypes = {
    type: PropTypes.string.isRequired,
    collider_transform: PropTypes.array,
    transform: PropTypes.array,
    userData: PropTypes.object,
    UIConfig: PropTypes.shape({
        Component: PropTypes.object.isRequired,
        style: PropTypes.object,
        positionNextToTheElement: PropTypes.bool,
    }),
};

export default Hotspot;



// export const addImageHotspotOnDrop = async (e, position, storeId, currentSceneId, cameraRef, folderId, products, maxRenderOrder, scene, setMaxRenderOrder, reduxDispatch) => {
// e.preventDefault();
// const imageId = e.dataTransfer.getData('id');
// const image = products[folderId].find((item) => item._id === imageId);
// const renderOrder = maxRenderOrder;
// const scale = 1;
//
// setMaxRenderOrder(renderOrder);
// console.log('-addImageHotspotOnDrop', image);
// //1. Create Image Marker
// const marker = new ImageMarker({
//     imageURL:formURL(image.image),
//     renderOrder,
//     scale,
//     userData: {},
//     UIConfig:{
//         Component:ImageMarkerUIForm,
//         style:{left:0, top:'3em', background:'none'}
//     }
// });
//
// //2. Render Marker
// marker.addToScene(scene);
//
// //3. Set Position
// marker.setPosition(position.x, position.y, position.z);
// marker.lookAt();
// marker.setUserData({imageId});
//
// //4. Get Transform data
// const transforms = marker.getTransforms();
// await sleep(1000); //Important!!! Do not delete sleep method from here!!!!!
//
//
// //6. Create Hotspot record
// const HOTSPOT_TYPE = 'product_image';
// const record = await  apiCreateHotspotByType(HOTSPOT_TYPE, storeId, currentSceneId, {
//     type: 'HotspotMarker',
//     scene: currentSceneId,
//     collider_transform: transforms.colliderTransform.elements,
//     transform: transforms.visualTransform.elements,
//     props: {
//         show_icon: true, //Where it used?
//         renderOrder: renderOrder,
//         scale: scale,
//         hotspot_type: HOTSPOT_TYPE,
//         image: imageId,
//     },
// });
//
// //7. Update marker.userData value
// marker.setUserData(record);
// marker.onClick();
// };
