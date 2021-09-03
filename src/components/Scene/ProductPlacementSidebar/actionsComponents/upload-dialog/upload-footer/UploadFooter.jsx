import React  from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select/creatable';
import { Button } from 'react-bootstrap';
import { setSelectedFolderAction } from '../../../../../../store/actions/productLibraryActions';
import { addProductImageToFolder } from '../../../../../../APImethods';
import styles from './UploadFooter.module.scss';
import { useRouter } from "next/router";


const UploadFooter = ({ productLibrary, images, closeDialog }) => {
    const { isLoading, folders, selectedFolder } = productLibrary;

    const buttonText = isLoading ? 'Uploading...' : 'Upload';
    const dispatch = useDispatch();
    const router = useRouter();
    const { id: selectedStoreId } = router.query;


    const handleFolderChange = (selected) => {
        setSelectedFolderAction(selected);
    };

    const parsePostData = () => {
        const folderId = selectedFolder.value;
        return images.map((image) => ({
            content: image.content,
            filename: image.filename,
            remove_background: image.remove_background,
            folder: folderId
        }));
    };

    const createProduct = async () => {
        try {
            const postData = parsePostData(images);
            dispatch(addProductImageToFolder(selectedStoreId, selectedFolder.value, postData));
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
        <>
            <Select
                className={styles["upload-dialog-Footer-select"]}
                placeholder="Select Folder or type to create a new one"
                options={[...folders]}
                value={selectedFolder}
                isDisabled={isLoading}
                onChange={handleFolderChange}
            />
            <Button variant="primary" onClick={handleUpload}>
                {buttonText}
            </Button>
        </>
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
    return { productLibrary };
};

export default connect(mapStateToProps)(UploadFooter);
