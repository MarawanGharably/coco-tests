import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Col, Row, Button } from 'react-bootstrap';
import StoreLayout from '../../components/layouts/StoreLayout';
import LoadingScreen from '../../components/LoadingScreen';
import HotspotEditor from '../../three-js/SceneEditor';
import { ModeSelector, SceneNavigator } from '../../components/Scene';
import ProductPlacementSidebar from '../../components/Scene/ProductPlacementSidebar';
import { showAppSuccessAlert, showAppErrorAlert } from '../../store/actions/appAlertsActions';
import { destroyProductLibraryData } from '../../store/actions/productLibraryActions';
import {destroySceneData} from "../../store/actions/SceneEditorActions";
import { getStoreFlags, apiPublishSceneData, getStoreScenes, getProductLibrary} from "../../APImethods";
import {
    UIManager,
    CollisionManager
} from "../../three-js/_contextDataManagers";
import styles from '../../assets/scss/hotspotsPage.module.scss';


export default function HotspotsPage(props){
    const store = useSelector(state =>({
        sceneEditorData: state['SceneEditor'],
        productLibrary:state['productLibrary']
    }));

    const { isEnabled, mode_slug } = store.productLibrary;
    const [isLoading, setLoading] = useState(false);
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
        try{
            const flagsReq = await dispatch(getStoreFlags(storeId, {updateStore:'productLibrary'}));
            const isEnabled = !!flagsReq['product_library_enabled'];

            if (isEnabled) dispatch(getProductLibrary(storeId));

            dispatch(getStoreScenes(storeId, {updateStore:'productLibrary'}));
        }catch(err){
            console.error({err})
        }
    };


    const publishSceneData = async () => {
        try {
            setLoading(true);
            await apiPublishSceneData(storeId);
            dispatch(showAppSuccessAlert('Store Published successfully'));
        } catch (error) {
            dispatch(showAppErrorAlert('An error occurred while publishing store'));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StoreLayout className={styles.cmp}>
            <Row style={{ color: '#fff' }}>
                <Col sm={12} md={5}>
                    <h1>Hotspots</h1>
                    <h6 style={{ fontSize: '14px', fontWeight: '300', color: '#efefef' }}>Click anywhere on the store to add a hotspot</h6>
                </Col>

                <Col sm={12} md={7} className="d-flex justify-content-end">
                    <ModeSelector />
                </Col>
            </Row>

            <Row className={styles['sceneEditor']}>
                <SceneNavigator sceneEditor={store.sceneEditorData} className={`${styles.sceneNavigator} ${showSideBar ? styles.withSideBar : ''}`} />
                <CollisionManager>
                    <UIManager>
                        <HotspotEditor storeId={storeId} />
                    </UIManager>
                </CollisionManager>

                    {isEnabled && (<ProductPlacementSidebar
                        visible={showSideBar}
                        productLibrary={store.productLibrary}
                    />)}
            </Row>

            {isLoading && <LoadingScreen />}

            <HotSpotsFooter onClick={publishSceneData} />
        </StoreLayout>
    );
};



const HotSpotsFooter = ({ onClick }) => {
    return (
        <div className={styles['hotspotsFooter']}>
            <Button  onClick={onClick}>
                Save Changes
            </Button>
        </div>
    );
};