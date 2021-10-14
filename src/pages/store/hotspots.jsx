import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';
import StoreLayout from '../../components/layouts/StoreLayout';
import LoadingScreen from '../../components/LoadingScreen';
import SceneEditor from '../../components/Scene/SceneEditor';
import { ModeSelector, SceneNavigator } from '../../components/Scene';
import ProductPlacementSidebar from '../../components/Scene/ProductPlacementSidebar';
import { destroyProductLibraryData } from '../../store/actions/productLibraryActions';
import {destroySceneData} from "../../store/actions/SceneEditorActions";
import { getStoreFlags, getStoreScenes, getProductLibrary} from "../../APImethods";
import { CollisionManager} from "../../three-js/_DataManagers";
import styles from '../../assets/scss/hotspotsPage.module.scss';


export default function HotspotsPage(props){
    const store = useSelector(state =>({
        sceneEditorData: state['SceneEditor'],
        productLibrary:state['productLibrary']
    }));

    const { isEnabled, mode_slug } = store.productLibrary;
    // const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { id:storeId } = router.query;

    const showSideBar = isEnabled && mode_slug === 'product_placement';


    useEffect(() => {
        if (storeId) fetchData();

        return function cleanup(){
            //remove all data loaded for the current store when exiting
            dispatch(destroySceneData());
            dispatch(destroyProductLibraryData());
        }
    }, [storeId]);



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
                <SceneNavigator sceneEditor={store.sceneEditorData} className={`${styles.sceneNavigator} ${showSideBar ? styles.withSideBar : ''}`} />
                <CollisionManager>
                        <SceneEditor storeId={storeId} />
                </CollisionManager>

                    {isEnabled && (<ProductPlacementSidebar
                        visible={showSideBar}
                        productLibrary={store.productLibrary}
                    />)}
            </Row>

            {/*{isLoading && <LoadingScreen />}*/}


        </StoreLayout>
    );
};


