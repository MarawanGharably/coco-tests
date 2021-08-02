import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import ModeSelector from '../../mode-selector/ModeSelector';
import ProductPlacementSidebar from './ProductPlacementSidebar';
import { getHotspotProducts, getStoreFlags } from '../../../APImethods';
import {
    setEnabledAction,
    setProductsAction,
    setFoldersAction,
    setSelectedFolderAction,
} from '../../../store/actions/productLibraryActions';
import { GENERAL_LABEL } from '../../../store/types/productLibrary';
import { setPageHeaderTitle } from '../../../store/actions';
import styles from './productPlacementPage.module.scss';

const ProductPlacementPage = () => {
    const dispatch = useDispatch();
    const HomePageStore = useSelector(store => store['HomePageStore']);
    const { selectedStoreId } = HomePageStore;
    const defaultFolder = { label: GENERAL_LABEL };


    useEffect(() => {
        dispatch(setPageHeaderTitle('Product Tagging'));
    }, []);

    const getIsEnabled = async () => {
        try {
            const response = await getStoreFlags(selectedStoreId);
            const { product_library_enabled: productLibraryEnabled } = response[0] || {};

            return productLibraryEnabled || false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const getProductLibrary = async () => {
        const isEnabled = await getIsEnabled();

        dispatch(setEnabledAction(isEnabled));


        if (isEnabled) {
            try {
                const response = await getHotspotProducts(selectedStoreId);
                const { products, folders } = response;

                dispatch(setProductsAction(products));
                dispatch(setFoldersAction(folders));
                dispatch(setSelectedFolderAction(defaultFolder));
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (selectedStoreId) {
            getProductLibrary();
        }
    }, [selectedStoreId]);

    return (
            <Row >
                <Col xs={8}  md={9}>
                    <ModeSelector />
                    <div id="three-editor-container" className={`${styles['three-editor-container']} full-width`}>
                        <HotspotEditor />
                    </div>
                </Col>
                <Col xs={4} md={3}>
                    <ProductPlacementSidebar />
                </Col>
            </Row>
    );
};

export default ProductPlacementPage;
