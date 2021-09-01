import React from 'react';
import ProductList from "./ProductList";
import Actions from "./Actions/Actions";
import styles from './ProductPlacementSidebar.module.scss';

export default function ProductPlacementSidebar({ visible=false, productLibrary }){
    return (
        <div className={`${styles["product-placement-sidebar"]} ${visible ? styles['visible'] :''} `} >

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
