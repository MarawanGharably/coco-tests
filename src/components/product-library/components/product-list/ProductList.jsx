import React from 'react';
import Product from './product/Product';
import { useProductLibrary } from '../../store/ProductLibraryStore';
import { SET_SELECTED_FOLDER } from '../../store/productLibraryActionEnums';
import { GENERAL_LABEL } from '../../store/productLibraryLabelEnums';

import {
    Title,
    Select,
    RightSideBar,
} from './styles';

const ProductList = () => {
    const [{ products, folders, selectedFolder }, dispatch] = useProductLibrary();
    const defaultOption = { label: GENERAL_LABEL };
    const selectedOption = selectedFolder || defaultOption;

    const filterFolders = ({ folderId }) => {
        if (!selectedFolder) return true;

        return !selectedFolder.id || folderId === selectedFolder.id;
    };

    const renderList = () => (
        products
            .filter(filterFolders)
            .map(({ id, imageUrl, folderId }) => (
                <Product key={id} id={id} imageUrl={imageUrl} folderId={folderId} />
            ))
    );

    const handleFolderChange = (selected) => {
        dispatch({
            type: SET_SELECTED_FOLDER,
            payload: selected,
        });
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
                {renderList()}
            </RightSideBar>
        </>
    );
};

export default ProductList;
