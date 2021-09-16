import React, { useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { v1 as uuid } from 'uuid';
import { Button } from 'react-bootstrap';
import FileInput from '../actionsComponents/file-input/FileInput';
import UploadDialog from '../actionsComponents/upload-dialog/UploadDialog';
import ConfirmationDialog from '../../../ConfirmationDialog';
import { deleteHotspotProductFolder } from '../../../../APImethods';
import styles from './Actions.module.scss';

const Actions = ({ selectedFolder }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {id:storeId} = router.query;

    const [isUploadDialogOpen, setUploadDialog] = useState(false);
    // const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
    const [images, setImages] = useState([]);
    const fileRef = useRef(null);
    // const canDelete = selectedFolder && selectedFolder.id;

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

    // const toggleDeleteDialog = () => {
    //     setDeleteDialog(!isDeleteDialogOpen);
    // };

    const toggleUploadDialog = () => {
        setUploadDialog(!isUploadDialogOpen);
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length) {
            const promises = files.map((file) => readFile(file));

            const products = await Promise.all(promises);

            setImages(products);
            toggleUploadDialog();
            fileRef.current.value = '';
        }
    };

    const openFileExplorer = (e) => {
        e.preventDefault();
        fileRef.current.click();
    };

    // const handleFolderDelete = () => {
    //     dispatch(deleteHotspotProductFolder(storeId, selectedFolder.id));
    //     toggleDeleteDialog();
    // };

    return (
        <div className={styles['product-library-actions']}>
            <FileInput fileRef={fileRef} name="images" hidden multiple handleChange={handleImageChange} />
            <Button variant="primary" onClick={openFileExplorer}>
                Add <span>Product</span>
            </Button>

            {/* TODO: find where and how "Delete Folder" should be placed */}
            {/*{ canDelete && (*/}
            {/*    <Button*/}
            {/*        className={styles['product-library-actions-delete']}*/}
            {/*        variant="danger"*/}
            {/*        onClick={toggleDeleteDialog}*/}
            {/*    >*/}
            {/*        Delete Folder*/}
            {/*    </Button>*/}
            {/*)}*/}
            {/*<ConfirmationDialog*/}
            {/*    title="Are you sure you want to delete this folder?"*/}
            {/*    content="All products inside will be removed"*/}
            {/*    show={isDeleteDialogOpen}*/}
            {/*    confirmLabel="Delete"*/}
            {/*    onHide={toggleDeleteDialog}*/}
            {/*    onConfirm={handleFolderDelete}*/}
            {/*/>*/}

            {/*Reset component state by unmounting*/}
            {isUploadDialogOpen && (<UploadDialog
                show={isUploadDialogOpen}
                onHide={toggleUploadDialog}
                images={images}
                setImages={setImages}
            />) }
        </div>
    );
};

const mapStateToProps = ({ productLibrary }) => {
    return { selectedFolder: productLibrary.selectedFolder };
};

export default connect(mapStateToProps, {})(Actions);
