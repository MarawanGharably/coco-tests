import React, { useEffect } from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
import ProductLibrary from '../../../components/product-library/ProductLibrary';
import Tabs from '../../../components/tabs/Tabs';
import TabContent from '../../../components/tabs/tab-content/TabContent';
import ModeSelector from '../../../components/mode-selector/ModeSelector';
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
                <Tabs>
                    <TabContent label="Scenes">
                        <SceneNavigator />
                    </TabContent>
                    <TabContent label="Products">
                        <ProductLibrary />
                    </TabContent>
                </Tabs>
            </ProductLibraryStore>
        </div>

    );
};

export default ProductPlacementPage;
