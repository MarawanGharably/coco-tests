import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import RightSideBar from '../../../right-side-bar/RightSideBar';
import List from './list/List';
import { setSelectedFolderAction } from '../../../../store/actions/productLibraryActions';
import { GENERAL_LABEL } from '../../../../store/types/productLibrary';
import styles from './ProductList.module.scss';

const ProductList = ({ productLibrary, setSelectedFolderAction }) => {
    const { products, folders, selectedFolder } = productLibrary;
    const defaultOption = { label: GENERAL_LABEL };
    const selectedOption = selectedFolder || defaultOption;

    const handleFolderChange = (selected) => {
        setSelectedFolderAction(selected);
    };

    return (
        <>
            <div className={styles["product-list-title"]}>Products</div>
            <Select
                className={styles["product-list-select"]}
                options={[defaultOption, ...folders]}
                value={selectedOption}
                onChange={handleFolderChange}
            />
            <RightSideBar className={styles["product-list-side-bar"]} >
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
