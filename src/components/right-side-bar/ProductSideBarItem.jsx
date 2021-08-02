import React from 'react';
import PropTypes from 'prop-types';
import './ContentSideBarItem.module.scss';

const ProductSideBarItem = ({
    selected, sku, name, thumbnail,
}) => (
    <div className={`product-item flex flex-center flex-column ${selected ? 'product-item-selected' : 'product-item-border'}`} data-sku={sku}>
        <div className="product-item-container flex flex-center">
            <img alt={`${name} product preview`} src={thumbnail} />
        </div>
        <span className="product-item-name">{name}</span>
    </div>
);

ProductSideBarItem.propTypes = {
    selected: PropTypes.bool,
    sku: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
};

ProductSideBarItem.defaultProps = {
    selected: false,
    sku: '',
    name: '',
    thumbnail: '',
};

export default ProductSideBarItem;
