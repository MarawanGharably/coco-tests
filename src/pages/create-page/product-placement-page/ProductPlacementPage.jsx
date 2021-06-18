import React, { useEffect } from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import ModeSelector from '../../../components/mode-selector/ModeSelector';
import ProductPlacementSidebar from './ProductPlacementSidebar';
import { ProductLibraryStore } from '../../../components/product-library/store/ProductLibraryStore';
import { useHomePageDataStore, HomePageActionEnums } from '../../../data-store/home-page-data-store/HomePageDataStore';

const ProductPlacementPage = () => {
    const [, dispatch] = useHomePageDataStore();

    useEffect(() => {
        dispatch({
            type: HomePageActionEnums.SET_PAGE_HEADER_TITLE,
            payload: { pageHeaderTitle: 'Product Tagging' },
        });
    }, [dispatch]);

    return (
        <div className="product-placement-page flex full-width">
            <ProductLibraryStore>
                <Page>
                    <ModeSelector />
                    <PageRow width="95%">
                        <div id="three-editor-container" className="full-width">
                            <HotspotEditor />
                        </div>
                    </PageRow>
                </Page>
                <ProductPlacementSidebar />
            </ProductLibraryStore>
        </div>

    );
};

export default ProductPlacementPage;
