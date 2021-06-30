import React from 'react';
import ProductList from './components/product-list/ProductList';
import Actions from './components/actions/Actions';
import './ProductLibrary.scss';

const ProductLibrary = () => (
    <div className="product-library-container">
        <ProductList />
        <Actions />
    </div>
);

export default ProductLibrary;
