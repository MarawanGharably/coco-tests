import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from './list/List';
import { setSelectedFolder } from '../../../../store/actions/productLibraryActions';
import { GENERAL_LABEL } from '../../../../store/types/productLibrary';

import {
    Title,
    Select,
    RightSideBar,
} from './styles';

const ProductList = ({ productLibrary, setSelectedFolder }) => {
    const { products, folders, selectedFolder } = productLibrary;
    const defaultOption = { label: GENERAL_LABEL };
    const selectedOption = selectedFolder || defaultOption;

    const handleFolderChange = (selected) => {
        setSelectedFolder(selected);
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
    setSelectedFolder: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    folders: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedFolder: PropTypes.string.isRequired,
};

const mapStateToProps = ({ productLibrary }) => {
    return { productLibrary };
};

export default connect( mapStateToProps,{ setSelectedFolder })(ProductList);
