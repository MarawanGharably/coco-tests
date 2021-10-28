import {ImageMarker} from "../three-base-components/Markers";

export const renderImageHotspotRecord = (data, sceneRef, setMaxRenderOrder) => {
    // console.log('-render: image HP', {data });
    const marker = new ImageMarker(data);
    marker.addToScene(sceneRef.current);

    if (data.renderOrder) setMaxRenderOrder(data.renderOrder);

    return marker;
};