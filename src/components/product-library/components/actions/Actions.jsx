import React, { useRef, useState } from 'react';
import { v1 as uuid } from 'uuid';
import FileInput from './file-input/FileInput';
import FancyButton from '../../../fancy-button/FancyButton';
import UploadDialog from './upload-dialog/UploadDialog';
import ConfirmationDialog from '../../../confirmation-dialog/ConfirmationDialog';
import useApi from '../../hooks/useAPI';
import { useProductLibrary } from '../../store/ProductLibraryStore';

import {
    Container,
    buttonStyle,
    deleteButtonStyle,
} from './styles';

const Actions = () => {
    const { deleteFolder } = useApi();
    const [{ selectedFolder }, dispatch] = useProductLibrary();
    const [isUploadDialogOpen, setUploadDialog] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
    const [images, setImages] = useState([]);
    const fileRef = useRef(null);
    const canDelete = selectedFolder && selectedFolder.id;

    const readFile = (file) => {
        const reader = new FileReader();

        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve({
                    id: uuid(),
                    content: e.target.result,
                    filename: file.name,
                    remove_background: false,
                });
            };

            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length) {
            const promises = files.map((file) => (
                readFile(file)
            ));

            const products = await Promise.all(promises);

            setImages(products);
            setUploadDialog(true);
        }
    };

    const openFileExplorer = (e) => {
        e.preventDefault();
        fileRef.current.click();
    };

    const openDeleteDialog = () => {
        setDeleteDialog(true);
    };

    const closeUploadDialog = () => {
        setUploadDialog(false);
    };

    const closeDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const handleFolderDelete = () => {
        deleteFolder(dispatch, selectedFolder.id);
        closeDeleteDialog();
    };

    return (
        <Container>
            <FileInput
                fileRef={fileRef}
                name="images"
                hidden
                multiple
                handleChange={handleImageChange}
            />
            <FancyButton
                text="Add Products"
                buttonStyle={buttonStyle}
                onClick={openFileExplorer}
            />
            { canDelete && (
                <FancyButton
                    text="Delete Folder"
                    buttonStyle={[buttonStyle, deleteButtonStyle]}
                    onClick={openDeleteDialog}
                />
            )}
            <ConfirmationDialog
                title="Are you sure you want to delete this folder?"
                content="All products inside will be removed"
                isOpen={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                handleDelete={handleFolderDelete}
            />
            <UploadDialog
                isOpen={isUploadDialogOpen}
                onClose={closeUploadDialog}
                images={images}
            />
        </Container>
    );
};

export default Actions;
