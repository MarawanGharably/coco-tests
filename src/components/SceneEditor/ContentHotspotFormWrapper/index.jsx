import React, { useState, useRef, useEffect } from 'react'
import ImageHotspotForm from '../MarkerForms/ImageHotspotForm';
import styles from './ContentHotspotFormWrapper.module.scss';

export default function ContentHotspotFormWrapper(props) {
    const { Marker, mode, onHotspotTypeChange } = props;

    
    let record = Marker.userData;
    const { isNew, needToSetHotspotType } = Marker.userData;
    const _ID = useRef();

    useEffect(() => { _ID.current = record?._id }, [Marker.uuid]);

    useEffect(() => () => removeMarkerIfNotSaved(), [_ID, Marker.uuid]);

    const removeMarkerIfNotSaved = () => {
        const id = _ID.current;
        if (!id) Marker.removeFromScene();
    };

    return (
        <div className={styles['formWrapper']}>
            {isNew && needToSetHotspotType ? <HotspotCreationDialog
                Marker={Marker}
                onHotspotTypeChange={onHotspotTypeChange}
            /> : (<>
                {Marker.hotspot_type === 'image_marker' && <ImageHotspotForm {...props}/>}
                {Marker.hotspot_type === 'hotspot_marker' && <div>Not implemented yet</div>}
            </>)}

        </div>
    )
}



const HotspotCreationDialog=({Marker, onHotspotTypeChange})=>{

    const selectHotspotTypeEvent=(hotspotType)=>{
        if(!Marker?.userData?._id) onHotspotTypeChange(Marker, hotspotType);
    }

    return (<div className={styles.typeSelector}>
        {<p className={styles['title']}>Select the type of hotspot</p>}
        <ul>
            <li onClick={(e)=>selectHotspotTypeEvent('image_hotspot')}> Image Hotspot </li>
            {/* <li onClick={(e)=>selectHotspotTypeEvent(e.target.id)}> Text Hotspot </li> */}
            {/* <li onClick={(e)=>selectHotspotTypeEvent(e.target.id)}> Video Hotspot </li> */}
        </ul>
    </div>)
}