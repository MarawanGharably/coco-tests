import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import ImageList from './image-list/ImageList';
import UploadFooter from './upload-footer/UploadFooter';
import styles from './UploadDialog.module.scss';

const UploadDialog = ({ show, onHide, images, setImages }) => {
    const [errors, setErrors] = useState();

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Upload Images</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Errors errors={errors} />
                <ImageList images={images} setImages={setImages} />
            </Modal.Body>

            <Modal.Footer className={styles['upload-dialog-Footer-container']}>
                <UploadFooter images={images} closeDialog={onHide} setErrors={setErrors} />
            </Modal.Footer>
        </Modal>
    );
};

const Errors = ({ errors }) => {
    if (!errors || errors.length < 1) return false;

    return (
        <>
            <h6 className="text-danger">Upload Error:</h6>
            <ul style={{ fontSize: '0.8em' }}>
                {errors?.map((item, i) => (
                    <li key={i} className="text-danger">
                        {item.message}
                    </li>
                ))}
            </ul>
        </>
    );
};

UploadDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string,
            filename: PropTypes.string,
        })
    ).isRequired,
    setImages: PropTypes.func.isRequired,
};

export default UploadDialog;
