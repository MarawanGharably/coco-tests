import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { GENERAL_LABEL } from '../../../../store/types/productLibrary';
import Product from "../Product";
import { setSelectedFolderAction } from '../../../../store/actions/productLibraryActions';
import styles from './ProductList.module.scss';



const ProductList = ({ productLibrary, setSelectedFolderAction }) => {
    const { products, folders, selectedFolder } = productLibrary;
    const defaultOption = { label: GENERAL_LABEL };
    const selectedOption = selectedFolder || defaultOption;

    const handleFolderChange = (selected) => {
        setSelectedFolderAction(selected);
    };


    const filterFolders = ({ folderId }) => {
        if (!selectedFolder) return true;

        return !selectedFolder.id || folderId === selectedFolder.id;
    };

    return (
        <div className={styles['product-list']}>
            <Select
                id='prodList'
                className={styles["selector"]}
                options={[defaultOption, ...folders]}
                value={selectedOption}
                onChange={handleFolderChange}
            />


            <div className={styles["list"]} >
                {products
                    .filter(filterFolders)
                    .map(({ id, imageUrl, folderId }, i) => (
                        <Product key={i} id={id} imageUrl={imageUrl} folderId={folderId} />
                    ))}
            </div>
        </div>
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



export default connect(null,{ setSelectedFolderAction })(ProductList);
