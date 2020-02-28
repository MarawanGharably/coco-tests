import React from 'react';

import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import ProductSideBar from '../../../components/product-side-bar/ProductSideBar';
import ProductSideBarItem from '../../../components/product-side-bar/ProductSideBarItem';

import mockData from './mock.json';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
import { EditorDataStore } from '../../../data-store/editor-data-store/EditorDataStore';

const ProductPlacementPage = () => {
    const renderItems = () => mockData.map((item, index) => (
        <ProductSideBarItem
            name={item.name}
            sku={item.sku}
            thumbnail={`https://cdn.obsess-vr.com/obsess-cms-dev/${item.thumbnail.path}`}
            selected={index % 4 === 0 || index % 3 === 0 || index % 9 === 0}
        />
    ));

    return (
        <EditorDataStore>
            <div className="product-placement-page flex full-width">
                <Page
                    pageTitle="Product Placement"
                    pageSubTitle="Place products approximately and we will fix it during review"
                >
                    <PageRow width="85%">
                        <SceneNavigator />
                    </PageRow>
                </Page>
                <ProductSideBar>
                    {renderItems()}
                </ProductSideBar>
            </div>
        </EditorDataStore>
    );
};

export default ProductPlacementPage;