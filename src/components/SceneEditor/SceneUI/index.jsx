import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { dragReleaseHotspotAutoSave } from '../../../utils/sceneHelpers';
import Scene, { Hotspot } from 'threejs-scene';
import { formURL } from '../../../utils';
import HotspotMarkerUIForm from "../MarkerForms/HotspotMarkerUIForm";
import ImageMarkerUIForm from "../MarkerForms/ImageMarkerUIForm";
import HotspotsSidebar from '../Sidebars/HotspotsSidebar';
import { v1 as uuid } from 'uuid';
import config from '../../../config';

//key - mode values
//val - scene marker type
const HOTSPOT_TYPES_BY_MODE = {
    product_tagging: 'hotspot_marker',
    product_placement: 'image_marker',
};


/**
 * SceneUI - is a wrapper for ThreeJS Scene
 * @param storeId
 * @returns {JSX.Element}
 */
const SceneUI = ({ storeId, mode, sceneObjects, sceneEditorData, productLibrary }) => {
    const { currentSceneId, storeScenes } = sceneEditorData;
    const { products, selectedFolder } = productLibrary;
    const reduxDispatch = useDispatch();

    const [mount, setMount] = useState(0);//used to force re-render
    const hotspots = useRef(sceneObjects);
    const allowEventsForMarkerTypeOnly = HOTSPOT_TYPES_BY_MODE[mode];

    useEffect(()=>{
        hotspots.current = sceneObjects;
        setMount((prevState)=>prevState + 1 );
        },[sceneObjects, currentSceneId]);


    //Calc Background config
    const sceneData = Object.values(storeScenes).find((scene) => scene._id.$oid === currentSceneId);
    const bgConf = useMemo(() => {
        if (sceneData) {
            const url = sceneData.cube_map_dir || sceneData.flat_scene_url;
            return {
                isFlatScene: !!sceneData.flat_scene_url,
                backgroundUrl: formURL(url),
            };
        }
    }, [sceneData]);






    const onMouseUp = (e, sceneObject, marker, isDragEvent) => {
        if (isDragEvent && marker) {
            dragReleaseHotspotAutoSave(sceneObject, marker, currentSceneId, storeId, reduxDispatch);
        } else if (!isDragEvent) {
            //Open UI
            //TODO: check for marker?.owner?.sceneObject presence
            if (marker && !marker?.sceneObject) console.error('Prop sceneObject not found - marker.owner.sceneObject', marker);

            //Open marker UI
            if (marker && marker?.sceneObject) marker.onClick(e);

            //Create marker & record, then Open UI
            else {
                if (mode === 'product_tagging') {
                    createAndPlaceNewMarker({
                        hotspot_type:'product',
                    });
                }
                else if (mode === 'content_hotspots') {
                   createAndPlaceNewMarker({
                       hotspot_type:'hotspotPlaceholder',
                       boxColliderConfig:{color:0x3C7AFA, opacity:0.5 },
                       isNew:true,
                       needToSetHotspotType:true,
                    });
                }
            }
        }
    };





    const onDrop = (e, position, maxRenderOrder ) => {
        const folderId = selectedFolder.value;
        const imageId = e.dataTransfer.getData('id');
        const image = products[folderId].find((item) => item._id === imageId);
        const renderOrder = maxRenderOrder;
        const scale = 1;

        hotspots.current = [...hotspots.current, {
            type:'product',
            hotspot_type:'product_image',
            scale,
            renderOrder:renderOrder,
            imageURL:image.image,
            userData:{
                scale,
                renderOrder:renderOrder,
                imageURL:image.image,
                imageId,
            },
        }];
        setMount(new Date().getTime());
    };

    //temporary placed markers has hotspot_type == 'hotspotPlaceholder'
    //Users can use additional UI to choose what type of hotspot they want to create
    const onHotspotTypeChange=(Marker, newHotspotType)=>{
        //remove old marker
        Marker.removeFromScene();
        hotspots.current = hotspots.current.filter(item=>item.isNew != true);
        const scale=1;
        const renderOrder=10;
        var imageURL = '';
        var hotspotType = '';

        switch(newHotspotType){
            
            case 'image_hotspot':
                imageURL=`${config.CDN_HOST}/image_hotspot_icon.png`;
                hotspotType = 'image';
                break;

            default:
                break;
        }

       createAndPlaceNewMarker({
            hotspot_type : hotspotType,
            scale,
            renderOrder,
            imageURL : imageURL,
            userData:{},
            boxColliderConfig:{color:0x3C7AFA, opacity:0.5 },
        });

    }

    const createAndPlaceNewMarker=({ hotspot_type, scale, imageURL, userData = {}, image, boxColliderConfig, ...rest })=>{
        const newMarker= {
            uuid:uuid(),

            boxColliderConfig,
            ...(imageURL ? {imageURL}:{}),
            ...(rest ? rest:{}),
            props:{
                hotspot_type,
                userData,
                ...(scale ? {scale}:{}),
                ...(image ? {image}:{}),
            }
        }

        hotspots.current = [...hotspots.current, newMarker];
        setMount(new Date().getTime());

        return newMarker;
    }

    return (
        <>
            {currentSceneId && (
                <Scene
                    sceneId={currentSceneId}
                    allowEventsForMarkerTypeOnly={allowEventsForMarkerTypeOnly}
                    bgConf={bgConf}
                    onMouseUp={onMouseUp}
                    onDrop={onDrop}
                >
                    {placeSceneHotspots(hotspots.current, mode, onHotspotTypeChange)}
                </Scene>
            )}
        </>
    );
};

const placeSceneHotspots=(sceneObjects, mode, onHotspotTypeChange)=>{
    if(!sceneObjects) return false;

    const UIConf={
        'product_image':{
            Component: mode === 'content_hotspots' ? (props)=><HotspotsSidebar mode='content_hotspot' {...props} />: ImageMarkerUIForm,
            style:mode === 'content_hotspots' ? {right:'0', top:'0' , height:'100%' , width:'29%' , background:'none'} :{left:'0', top:'3em', background:'none'},
        },
        'product':{
            Component: mode === 'content_hotspots' ? (props)=><HotspotsSidebar mode='content_hotspot' {...props} />: HotspotMarkerUIForm,
            positionNextToTheElement:mode === 'content_hotspots' ? false : true,
            style:mode === 'content_hotspots' ? {right:'0', top:'0' , height:'100%' , width:'29%' , background:'none'} :{background:'none'},
        },
        'image':{
            Component: mode === 'content_hotspots' ? (props)=><HotspotsSidebar mode='content_hotspot' {...props} />: ImageMarkerUIForm,
            style:mode === 'content_hotspots' ? {right:'0', top:'0' , height:'100%' , width:'29%' , background:'none'} :{left:'0', top:'3em', background:'none'},
        },
        //hotspotPlaceholder used to display a scene marker of unknown yet type
        'hotspotPlaceholder':{
            Component:(props)=><HotspotsSidebar mode='content_hotspot' onHotspotTypeChange={onHotspotTypeChange} {...props} />,
            style:{right:'0', top:'0' , height:'100%' , width:'29%' , background:'none'},
        },
    }

   return sceneObjects.map((item,idx) => {
        const hotspot_type = item?.props?.hotspot_type || item.hotspot_type;

        let imageHotspotProps = {};
        if (['product_image', 'image'].includes(hotspot_type)) {
            const imageData = item.imageURL || item.props?.image?.image;
            imageHotspotProps.scale = item?.props?.scale || item.scale;
            imageHotspotProps.renderOrder = item?.props?.renderOrder || item.renderOrder;
            imageHotspotProps.imageURL= typeof imageData === 'object' ? formURL(imageData) : imageData
        }
        // Always use unique keys!!!
        return (
            <Hotspot
                key={item?._id || item.uuid || idx}
                type={['product_image', 'image'].includes(hotspot_type) ? 'image_hotspot' : 'hotspot'}
                collider_transform={item.collider_transform}
                transform={item.transform}
                userData={item?.userData || item}
                UIConfig={UIConf[hotspot_type]}
                {...imageHotspotProps}
                boxColliderConfig={item?.boxColliderConfig || null}
            />
        );
    });
}

export default SceneUI;
