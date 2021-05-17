import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../../../../../fancy-button/FancyButton';
import useAPI from '../../../../hooks/useAPI';
import { useProductLibrary } from '../../../../store/ProductLibraryStore';
import { GENERAL_LABEL } from '../../../../store/productLibraryLabelEnums';

import {
    Container,
    Select,
    buttonStyle,
} from './styles';

const UploadFooter = ({ images, closeDialog }) => {
    const { createProduct } = useAPI();
    const [{ isLoading, folders, selectedFolder }, dispatch] = useProductLibrary();
    const [folder, setFolder] = useState(selectedFolder);
    const generalOption = { label: GENERAL_LABEL };
    const buttonText = isLoading ? 'Uploading...' : 'Upload';

    const handleFolderChange = (selected) => {
        setFolder(selected);
    };

    const handleUpload = () => {
        if (isLoading) return;

        createProduct({
            dispatch, images, folder, closeDialog,
        });
    };

    return (
        <Container>
            <Select
                placeholder="Select Folder or type to create a new one"
                options={[generalOption, ...folders]}
                value={folder}
                isDisabled={isLoading}
                onChange={handleFolderChange}
            />
            <FancyButton
                text={buttonText}
                buttonStyle={buttonStyle}
                onClick={handleUpload}
            />
        </Container>
    );
};

UploadFooter.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        filename: PropTypes.string,
    })).isRequired,
    closeDialog: PropTypes.func.isRequired,
};

export default UploadFooter;
