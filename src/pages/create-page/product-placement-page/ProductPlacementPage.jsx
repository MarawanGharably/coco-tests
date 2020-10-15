import React from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';

const ProductPlacementPage = () => (
    <div className="product-placement-page flex full-width">
        <Page
            pageTitle="Product Placement"
            pageSubTitle="Place products approximately and we will fix it during review"
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

export default ProductPlacementPage;
