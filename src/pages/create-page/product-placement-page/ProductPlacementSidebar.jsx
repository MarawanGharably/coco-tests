import React from 'react';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
import ProductLibrary from '../../../components/product-library/ProductLibrary';
import Tabs from '../../../components/tabs/Tabs';
import TabContent from '../../../components/tabs/tab-content/TabContent';
import { useProductLibrary } from '../../../components/product-library/store/ProductLibraryStore';

const ProductPlacementSidebar = () => {
    const [{ isEnabled }] = useProductLibrary();

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

export default ProductPlacementSidebar;
