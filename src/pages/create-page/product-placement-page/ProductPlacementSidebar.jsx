import React from 'react';
import { connect } from 'react-redux';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
import ProductLibrary from '../../../components/product-library/ProductLibrary';
import Tabs from '../../../components/tabs/Tabs';
import TabContent from '../../../components/tabs/tab-content/TabContent';

const ProductPlacementSidebar = ({ isEnabled }) => {
    const getTabs = () => (
        <Tabs>
            <TabContent label="Scenes" active>
                <SceneNavigator />
            </TabContent>
            <TabContent label="Products">
                <ProductLibrary />
            </TabContent>
        </Tabs>
    );

    return isEnabled ? getTabs() : <SceneNavigator />;
};

const mapStateToProps = (state) => {
    const { isEnabled } = state.productLibrary;

    return { isEnabled };
};
  
export default connect(
    mapStateToProps,
)(ProductPlacementSidebar);
