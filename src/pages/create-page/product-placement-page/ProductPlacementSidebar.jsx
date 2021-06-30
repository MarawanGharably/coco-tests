import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
import ProductLibrary from '../../../components/product-library/ProductLibrary';

const ProductPlacementTabs = () => {
    const { isEnabled } = useSelector(state => state.productLibrary);

    return (
        <div className="product-placement-sidebar">
            <Tabs defaultActiveKey="scenes" id="uncontrolled-tab-example">
                <Tab className="tab-container" eventKey="scenes" title="Scenes">
                    <SceneNavigator />
                </Tab>
                { isEnabled && (
                    <Tab className="tab-container" eventKey="products" title="Products">
                        <ProductLibrary />
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default ProductPlacementTabs;
