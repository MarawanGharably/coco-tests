import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import ModeSelector from '../../../components/mode-selector/ModeSelector';
import ProductPlacementSidebar from './ProductPlacementSidebar';
import {getHotspotProducts, getStoreFlags} from "../../../APImethods";
import {setEnabledAction, setProducts} from "../../../store/actions/productLibraryActions";
import {GENERAL_LABEL} from "../../../store/types/productLibrary";
import {setPageHeaderTitle} from '../../../store/actions';


const ProductPlacementPage = () => {
    const dispatch = useDispatch();
    const HomePageStore = useSelector(store => store['HomePageStore']);
    const {selectedStoreId} = HomePageStore;
    const defaultFolder = { label: GENERAL_LABEL };


    useEffect(() => {
        dispatch(setPageHeaderTitle('Product Tagging'));
    }, []);


    const getProductLibrary = async () => {
        const response = await getStoreFlags(selectedStoreId);
        const { product_library_enabled: productLibraryEnabled } = response[0] || {};
        const isEnabled = productLibraryEnabled || false;

        dispatch(setEnabledAction(isEnabled));

        if (isEnabled) {
            try {
                const response = await getHotspotProducts(selectedStoreId);
                const {products, folders} = response;

                dispatch(setProducts({
                    products,
                    folders,
                    selectedFolder: defaultFolder,
                }));
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
        <div className="product-placement-page flex full-width">
            <Page>
                <ModeSelector />
                <PageRow width="95%">
                    <div id="three-editor-container" className="full-width">
                        <HotspotEditor />
                    </div>
                </PageRow>
            </Page>
            <ProductPlacementSidebar />
        </div>
    );
};

export default ProductPlacementPage;
