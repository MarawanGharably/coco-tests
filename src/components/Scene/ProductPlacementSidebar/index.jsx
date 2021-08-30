import React from 'react';
import ProductList from "../product-library/ProductList";
import Actions from "../product-library/Actions/Actions";
import styles from './ProductPlacementSidebar.module.scss';

export default function ProductPlacementSidebar({ showSideBar, productLibrary }){
    return (
        <div className={`${styles["product-placement-sidebar"]} ${showSideBar ? styles['visible'] :''} `} >

            <div className={styles.header}>
                <div className={styles["title"]}>Products</div>
                <Actions />
            </div>

            <div className={styles.scrollArea}>
                <ProductList productLibrary={productLibrary} />
            </div>
        </div>
    );
};