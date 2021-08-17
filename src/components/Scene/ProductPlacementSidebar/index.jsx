import React from 'react';
import {Row} from "react-bootstrap";
import ProductList from "../product-library/ProductList";
import Actions from "../product-library/Actions/Actions";
import styles from './ProductPlacementSidebar.module.scss';

export default function ProductPlacementSidebar({ showSideBar, productLibrary }){
    return (
        <div className={`${styles["product-placement-sidebar"]} ${showSideBar ? styles['visible'] :''} `} >

            <Row className={styles.header}>
                <div className={styles["title"]}>Products</div>
                <Actions />
            </Row>

            <div className={styles['scrollArea']}>
                <ProductList productLibrary={productLibrary} />
            </div>
        </div>
    );
};
