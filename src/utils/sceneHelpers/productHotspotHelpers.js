import HotspotMarkerUIForm from "../../components/Scene/MarkerForms/HotspotMarkerUIForm";
import {HotspotMarker} from "../../three-js/_constructors/Markers";



const _createMarker=(opt={})=>{
    const {userData} = opt;
    return new HotspotMarker({
        userData:userData,
        // collider_transform,
        // transform,
        UIConfig:{
            Component:HotspotMarkerUIForm,
            positionNextToTheElement:true,
            style:{background:'none'}
        }
    });
}

const _renderMarker=(marker, scene)=>{
    marker.addToScene(scene);
    marker.setScale();

    return marker;
}





/**
 * on Scene Click event
 * @param e
 * @param intersects
 * @param sceneRef
 */
export const createProductMarkerOnEvent = (e, intersects, scene) => {
    //Find underlying scene background object 
    const sceneObject = intersects.find(item=> ['BackgroundCube', 'flatBackground'].includes(item.object.name));
    const point = sceneObject.point;
    const newMarker = _createMarker();

    _renderMarker(newMarker, scene);

    newMarker.setPosition(point.x, point.y, point.z);
    newMarker.onClick(e);
}


/**
 * Renders marker from stored hotspot record {}
 * @param object - scene object
 * @param sceneRef
 * @returns {HotspotMarker}
 */
export const renderProductHotspotRecord = (object={}, sceneRef) => {
    const marker = _createMarker({userData:object.userData});

    marker.addToScene(sceneRef.current);
    marker.setTransform(object.collider_transform, object.transform);
    marker.setScale();

    return marker;
};
