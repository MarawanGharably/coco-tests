import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';
import StoreLayout from '../../components/layouts/StoreLayout';
import SceneEditor from '../../components/Scene/SceneEditor';
import { ModeSelector, SceneNavigator } from '../../components/Scene';
import ProductPlacementSidebar from '../../components/Scene/ProductPlacementSidebar';
import { destroyProductLibraryData } from '../../store/actions/productLibraryActions';
import {destroySceneData} from "../../store/actions/SceneEditorActions";
import {getStoreFlags, getStoreScenes, getProductLibrary, apiGetHotspotsByType} from "../../APImethods";
import styles from '../../assets/scss/hotspotsPage.module.scss';


export default function HotspotsPage(){
    const sceneEditor = useSelector(state =>state['SceneEditor']);
    const { currentSceneId } = sceneEditor;

    const productLibrary = useSelector(state =>state['productLibrary']);
    const { isEnabled, mode_slug, deleteProductId } = productLibrary;

    const [sceneObjects, setSceneObjects] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const { id:storeId } = router.query;

    const showSideBar = isEnabled && mode_slug === 'product_placement';

    //Image Removed, delete associated colliders (scene objects)
    useEffect(() => {
        const newData = sceneObjects.filter(item=>item.props?.image?._id !== deleteProductId);
        setSceneObjects(newData);
    }, [deleteProductId]);


    useEffect(() => {
        if(!storeId) return;
        else fetchData();

        return function cleanup(){
            //remove all data loaded for the current store when exiting
            dispatch(destroySceneData());
            dispatch(destroyProductLibraryData());
        }
    }, [storeId]);

    useEffect(() => {
        const fetchSceneHotspots = async (hotspotTypes = []) => {
            if (!currentSceneId || currentSceneId.length < 5) return;
            setSceneObjects([]);

            const getRoomObjectData = async () => {
                if (Array.isArray(hotspotTypes)) {
                    const promises = hotspotTypes.map((hotspotType) => apiGetHotspotsByType(hotspotType, storeId, currentSceneId));
                    return Promise.all(promises);
                }

                return apiGetHotspotsByType(hotspotTypes, storeId, currentSceneId);
            };

            const response = await getRoomObjectData();

            const formatted = response.flat().filter((object) => typeof object !== 'string');
            console.log('%c> records', 'color:blue', formatted);
            setSceneObjects(formatted);
        };

        //#1. Fetch Scene Hotspots
        fetchSceneHotspots(['product', 'product_image']);
    }, [currentSceneId]);

    const fetchData = async () => {
        // setLoading(true);
        try{
            const flagsReq = await dispatch(getStoreFlags(storeId, {updateStore:'productLibrary'}));
            const isEnabled = !!flagsReq['product_library_enabled'];

            if (isEnabled) dispatch(getProductLibrary(storeId));

            dispatch(getStoreScenes(storeId, {updateStore:'productLibrary'}));
        }catch(err){
            console.error({err})
        }finally {
            // setLoading(false);
        }
    };



    return (
        <StoreLayout className={styles.cmp}>
            <Row style={{ color: '#fff' }}>
                <Col sm={12} md={6}>
                    <h1 style={{lineHeight: '0.7'}}>Hotspots</h1>
                    <h6 style={{ fontSize: '14px', fontWeight: '300', color: '#efefef' }}>Click anywhere on the scene image to add a hotspot. <br/> Your changes will be saved immediately</h6>
                </Col>

                <Col sm={12} md={6}>
                    <ModeSelector />
                </Col>
            </Row>

            <Row className={styles['sceneEditor']}>
                <SceneNavigator
                    sceneEditor={sceneEditor}
                    className={`${styles.sceneNavigator} ${showSideBar ? styles.withSideBar : ''}`}
                />

                {storeId && (<SceneEditor
                    storeId={storeId}
                    sceneObjects={sceneObjects}
                    sceneEditorData={sceneEditor}
                    productLibrary={productLibrary}
                />)}

                    {isEnabled && (<ProductPlacementSidebar
                        visible={showSideBar}
                        productLibrary={productLibrary}
                    />)}
            </Row>

        </StoreLayout>
    );
};


