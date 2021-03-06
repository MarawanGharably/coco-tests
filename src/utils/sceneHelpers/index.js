import {updateHotspotAPI} from "../../APImethods";





//AutoSave fn for all hotspot types
export const dragReleaseHotspotAutoSave = async (sceneObject, marker, currentSceneId, storeId, reduxDispatch) => {
    if (!marker) return;

    // const { colliderTransform, visualTransform } = marker.getTransforms();
    const { colliderTransform, visualTransform } = marker.transforms;

    const {_id} = marker.userData || {};
    const markerType = marker.hotspot_type; //image_marker, hotspot_marker
    const hotspot_type= markerType =='image_marker' ? 'product_image':'product';
    const { renderOrder, scale, product_sku } = marker?.userData?.props || {};

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