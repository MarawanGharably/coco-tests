export * from './productHotspotHelpers';
export * from './imageHotspotHelpers';
export * from './UIHelpers';


export const getComponentUUID = (marker) => {
    const { uuid } = marker.owner.components.find((component) => (component.uuid));
    return uuid;
};