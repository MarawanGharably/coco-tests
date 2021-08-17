import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';

import StoreLayout from '../../../components/layouts/StoreLayout';
import LoadingScreen from '../../../components/LoadingScreen';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import { ModeSelector, SceneNavigator } from '../../../components/Scene';
import ProductPlacementSidebar from '../../../components/Scene/ProductPlacementSidebar';
import { setEnabledAction, setFoldersAction, setProductsAction, setSelectedFolderAction } from '../../../store/actions/productLibraryActions';
import { getHotspotProducts, getStoreFlags, apiPublishSceneData, getStoreScenes } from '../../../APImethods';
import { setCurrentSceneID, setSceneData } from '../../../store/actions/SceneEditorActions';
import { showSuccessMessage, showErrorMessage } from '../../../store/actions/toastActions';
import { GENERAL_LABEL } from '../../../store/types/productLibrary';
import styles from '../../../assets/scss/hotspotsPage.module.scss';

let HotspotsPage = (props) => {
    const { isEnabled, mode_slug } = props.productLibrary;
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const { storeId } = router.query;

    const showSideBar = isEnabled && mode_slug == 'product_placement' ? true : false;

    useEffect(() => {
        if (storeId) fetchData();
    }, [storeId]);

    const fetchData = async () => {
        const flagsReq = await getStoreFlags(storeId);
        // if(flagsReq[0]) setStoreFlags({product_library_enabled: flagsReq[0]['product_library_enabled'] });
        const isEnabled = !!flagsReq[0]['product_library_enabled'];

        dispatch(setEnabledAction(isEnabled));

        if (isEnabled) {
            const { products, folders } = await getHotspotProducts(storeId);
            console.log('>getHotspotProducts', { products, folders });
            const defaultFolder = { label: GENERAL_LABEL };
            dispatch(setProductsAction(products));
            dispatch(setFoldersAction(folders));
            dispatch(setSelectedFolderAction(defaultFolder));
        }

        getStoreScenes(storeId).then((res) => {
            dispatch(setSceneData(res));
            dispatch(setCurrentSceneID(res[0]._id.$oid));
        });
    };

    const publishSceneData = async () => {
        try {
            setLoading(true);
            await apiPublishSceneData(storeId);
            dispatch(showSuccessMessage('Store Published successfully'));
        } catch (error) {
            dispatch(showErrorMessage('An error occurred while publishing store'));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StoreLayout className={styles.hotspotsPage}>
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
                <SceneNavigator sceneEditor={props.SceneEditor} className={`${styles.sceneNavigator} ${showSideBar ? styles.withSideBar : ''}`} />
                <HotspotEditor storeId={storeId} />
                <ProductPlacementSidebar showSideBar={showSideBar} productLibrary={props.productLibrary} />
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

const mapStateToProps = ({ SceneEditor, productLibrary }) => {
    return { SceneEditor, productLibrary };
};

export default connect(mapStateToProps, {})(HotspotsPage);
