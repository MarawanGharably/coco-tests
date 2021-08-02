import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import SceneNavigator from '../../../scene-navigator/SceneNavigator';
import ProductLibrary from '../../../product-library/ProductLibrary';
import styles from './ProductPlacementSidebar.module.scss';

const ProductPlacementSidebar = () => {
    const { isEnabled } = useSelector(state => state.productLibrary);

    return (
        <div className={styles["product-placement-sidebar"]}>
            <Tabs defaultActiveKey="scenes" id="uncontrolled-tab-example" >
                <Tab className={styles["tab-container"]} eventKey="scenes" title="Scenes"  >
                    <SceneNavigator />
                </Tab>
                { isEnabled && (
                    <Tab className={styles["tab-container"]} eventKey="products" title="Products"  >
                        <ProductLibrary />
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default ProductPlacementSidebar;
