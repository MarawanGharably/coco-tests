import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FancyButton from '../../../../../fancy-button/FancyButton';
import { GENERAL_LABEL } from '../../../../../../store/types/productLibrary';
import { createHotspotProduct } from "../../../../../../APImethods";
import { setSelectedFolder } from "../../../../../../store/actions/productLibraryActions";
import {useHomePageDataStore} from "../../../../../../data-store/home-page-data-store/HomePageDataStore";
import {Container,Select, buttonStyle } from './styles';


const UploadFooter = ({productLibrary, images, closeDialog}) => {
    const { isLoading, folders, selectedFolder } =  productLibrary;
    const [{ selectedStoreId }] = useHomePageDataStore();
    const [folder, setFolder] = useState(selectedFolder);
    const generalOption = { label: GENERAL_LABEL };
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

    const handleUpload = () => {
        if (isLoading) return;

        const postData = parsePostData(images);
        const defaultFolder = { label: GENERAL_LABEL };
        dispatch(createHotspotProduct(selectedStoreId, postData))
            .then(res=>{
                const { folders } = res;
                const productFolder = folders.find(({ label }) => label === folder.label);
                const selectedFolder = productFolder || defaultFolder;

                dispatch(setSelectedFolder(selectedFolder));
            })
            .catch(err=>{})
            .finally(()=>{
                closeDialog();
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

const mapStateToProps = ({ productLibrary }) => {
    return { productLibrary  };
};
  
export default connect(
    mapStateToProps,
)(UploadFooter);
