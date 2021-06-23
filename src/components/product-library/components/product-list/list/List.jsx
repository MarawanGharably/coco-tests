import React from 'react';
import PropTypes from 'prop-types';
import Product from '../product/Product';

const List = ({ products, selectedFolder }) => {
    const filterFolders = ({ folderId }) => {
        if (!selectedFolder) return true;

        return !selectedFolder.id || folderId === selectedFolder.id;
    };

    return products
        .filter(filterFolders)
        .map(({ id, imageUrl, folderId }, i) => (
            <Product key={i} id={id} imageUrl={imageUrl} folderId={folderId} />
        ));
};

List.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedFolder: PropTypes.string.isRequired,
};

export default List;
