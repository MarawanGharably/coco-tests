import HotspotMarkerUIForm from "../../components/SceneEditor/MarkerForms/HotspotMarkerUIForm";
import {HotspotMarker} from "../../three-js/three-base-components/Markers";



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



