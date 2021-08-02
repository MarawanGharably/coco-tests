import React from 'react';
import ProductList from './components/product-list/ProductList';
import Actions from './components/actions/Actions';
import styles from './ProductLibrary.module.scss';

const ProductLibrary = () => (
    <div className={styles['product-library-container']}>
        <ProductList />
        <Actions />
    </div>
);

export default ProductLibrary;
