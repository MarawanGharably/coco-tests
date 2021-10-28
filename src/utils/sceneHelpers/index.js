import {updateHotspotAPI} from "../../APImethods";
import {HotspotMarker} from "../../three-js/three-base-components/Markers";
import HotspotMarkerUIForm from "../../components/SceneEditor/MarkerForms/HotspotMarkerUIForm";


export * from './imageHotspotHelpers';

/**
 * on Scene Click event
 * @param e
 * @param point
 * @param scene
 */
export const createProductMarkerOnEvent = (e, point, scene) => {
    //#1. Create new marker
    const newMarker = new HotspotMarker({
        userData:{},
        UIConfig:{
            Component:HotspotMarkerUIForm,
            positionNextToTheElement:true,
            style:{background:'none'}
        }
    });

    //#2. Add to the scene
    // _renderMarker(newMarker, scene);
    newMarker.addToScene(scene);
    newMarker.setScale();



    //#3. Set position and open UI
    newMarker.setPosition(point.x, point.y, point.z);
    newMarker.onClick(e);
}



//AutoSave fn for all hotspot types
export const dragReleaseHotspotAutoSave = async (object, currentSceneId, storeId, reduxDispatch) => {
    if (!object) return;

    const marker = object.owner;
    const { colliderTransform, visualTransform } = marker.getTransforms();
    const {_id} = marker.userData || {};
    const markerType = marker.hotspot_type; //image_marker, hotspot_marker
    const hotspot_type= markerType =='image_marker' ? 'product_image':'product';
    const { renderOrder, scale, product_sku } = marker?.userData?.props || {};
    // console.log('-DRAG EVENT', marker);

    if (_id) {
        const postData = {
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                hotspot_type,
                ...(product_sku ? {product_sku} : {}),
                ...(scale ? {scale} : {}),
                ...(renderOrder ? { renderOrder} : {}),
            },
        };

        try {
            const validate = hotspot_type !== "product";
            console.log('SE:updateHotspotAPI');
            // ATTENTION: validation is force disabled for product hotspots to bypass SKU validation. In future, please make this a frontend toggle
            reduxDispatch(updateHotspotAPI(_id, storeId, currentSceneId, postData, validate))
                .then(res=>{
                    console.log('%c -updated', 'color:blue', res);
                }).catch(err=>{

            });
        } catch (err) {
            console.error(err);
        }
    }
};