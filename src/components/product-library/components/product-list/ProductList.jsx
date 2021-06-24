import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from './list/List';
import { setSelectedFolderAction } from '../../../../store/actions/productLibraryActions';
import { GENERAL_LABEL } from '../../../../store/types/productLibrary';

import {
    Title,
    Select,
    RightSideBar,
} from './styles';

const ProductList = ({ productLibrary, setSelectedFolderAction }) => {
    const { products, folders, selectedFolder } = productLibrary;
    const defaultOption = { label: GENERAL_LABEL };
    const selectedOption = selectedFolder || defaultOption;

    const handleFolderChange = (selected) => {
        setSelectedFolderAction(selected);
    };

    return (
        <>
            <Title>Products</Title>
            <Select
                options={[defaultOption, ...folders]}
                value={selectedOption}
                onChange={handleFolderChange}
            />
            <RightSideBar cols="1" rowHeight="20em">
                <List products={products} selectedFolder={selectedFolder} />
            </RightSideBar>
        </>
    );
};

ProductList.propTypes = {
    setSelectedFolderAction: PropTypes.func.isRequired,
    productLibrary: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.object).isRequired,
        folders: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedFolder: PropTypes.shape({
            id: PropTypes.number,
            label: PropTypes.string,
        }),
    }).isRequired,
};

const mapStateToProps = ({ productLibrary }) => {
    return { productLibrary };
};

export default connect(
    mapStateToProps,
    { setSelectedFolderAction },
)(ProductList);
