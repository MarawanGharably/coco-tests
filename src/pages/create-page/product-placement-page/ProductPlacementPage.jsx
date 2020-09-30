import React from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';

import { EditorDataStore } from '../../../data-store/editor-data-store/EditorDataStore';

import HotspotEditor from '../../../three-js/three-editor/HotspotEditor';

const ProductPlacementPage = () => (
    <EditorDataStore>
        <div id="product-placement-page" className="flex full-width">
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
        </div>
    </EditorDataStore>
);
export default ProductPlacementPage;
