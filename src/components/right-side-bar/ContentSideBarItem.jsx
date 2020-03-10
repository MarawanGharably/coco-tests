import React from 'react';
import PropTypes from 'prop-types';

const ContentSideBarItem = ({ selected, name, thumbnail }) => (
    <div className={`product-item flex flex-center flex-column ${selected ? 'product-item-selected' : 'product-item-border'}`}>
        <span className="product-item-name">{name}</span>
        <div className="product-item-container flex flex-center">
            <img alt={`${name} content preview`} src={thumbnail} />
        </div>
        <div className="content-url-remover">link to remove image/item with x</div>
    </div>
);

ContentSideBarItem.propTypes = {
    selected: PropTypes.bool,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
};

ContentSideBarItem.defaultProps = {
    selected: false,
    name: '',
    thumbnail: '',
};

export default ContentSideBarItem;
