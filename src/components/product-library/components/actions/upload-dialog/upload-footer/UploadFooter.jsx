import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedFolderAction } from '../../../../../../store/actions/productLibraryActions';
import { createHotspotProduct } from '../../../../../../APImethods';
import { GENERAL_LABEL } from '../../../../../../store/types/productLibrary';
import FancyButton from '../../../../../fancy-button/FancyButton';
import { Container, Select, buttonStyle } from './styles';



const UploadFooter = ({ productLibrary, images, closeDialog }) => {
    const { isLoading, folders, selectedFolder } =  productLibrary;
    const HomePageStore = useSelector(store => store['HomePageStore']);
    const {selectedStoreId} = HomePageStore;

    const [folder, setFolder] = useState(selectedFolder);
    const defaultFolder = { label: GENERAL_LABEL };
    const buttonText = isLoading ? 'Uploading...' : 'Upload';
    const dispatch = useDispatch();


    const handleFolderChange = (selected) => {
        setFolder(selected);
    };

    const parsePostData = (images) => {
        const folderId = folder.id || 0;
        const folderName = folder.label === GENERAL_LABEL ? '' : folder.label;

        return {
            file_upload: images.map((image) => ({
                content: image.content,
                filename: image.filename,
                remove_background: image.remove_background,
                folder_id: folderId,
                folder_name: folderName,
            })),
        };
    };

    const createProduct = async () => {
        try {
            const postData = parsePostData(images);
            const { folders } = await dispatch(createHotspotProduct(selectedStoreId, postData));
            const productFolder = folders.find(({ label }) => label === folder.label);
            const selectedFolder = productFolder || defaultFolder;

            dispatch(setSelectedFolderAction(selectedFolder));
        } catch (error) {
            console.error(error);
        } finally {
            closeDialog();
        }
    };

    const handleUpload = () => {
        if (isLoading) return;

        createProduct();
    };

    return (
        <Container>
            <Select
                placeholder="Select Folder or type to create a new one"
                options={[defaultFolder, ...folders]}
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
    productLibrary: PropTypes.shape({
        isLoading: PropTypes.bool,
        folders: PropTypes.arrayOf(PropTypes.object),
        selectedFolder: PropTypes.shape({
            id: PropTypes.number,
            label: PropTypes.string,
        }),
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        filename: PropTypes.string,
    })).isRequired,
    closeDialog: PropTypes.func.isRequired,
};

const mapStateToProps = ({ productLibrary }) => {
    return { productLibrary  };
};
  
export default connect( mapStateToProps)(UploadFooter);
