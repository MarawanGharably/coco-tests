import React from 'react';
import ProductList from './components/product-list/ProductList';
import Actions from './components/actions/Actions';

import {
    Container,
} from './styles';

const ProductLibrary = () => (
    <Container>
        <ProductList />
        <Actions />
    </Container>
);

export default ProductLibrary
