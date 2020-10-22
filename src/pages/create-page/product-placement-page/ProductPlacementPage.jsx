import React, { useEffect } from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
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
            <Page
                pageSubTitle="Click on 360 image to place hotspot and enter SKU ID"
            >
                <PageRow width="80%">
                    <div id="three-editor-container" className="full-width">
                        <HotspotEditor />
                    </div>
                </PageRow>
            </Page>
            <SceneNavigator />
        </div>

    );
};

export default ProductPlacementPage;
