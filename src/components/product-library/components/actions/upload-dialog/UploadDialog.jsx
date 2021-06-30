import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import ImageList from './image-list/ImageList';
import UploadFooter from './upload-footer/UploadFooter';
import './UploadDialog.scss';

const UploadDialog = ({ show, onHide, images, setImages }) => (
    <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
    >
        <Modal.Header closeButton>
            <Modal.Title className="text-center">Upload Images</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <ImageList images={images} setImages={setImages} />
        </Modal.Body>

        <Modal.Footer className="upload-dialog-footer-container">
            <UploadFooter images={images} closeDialog={onHide} />
        </Modal.Footer>
    </Modal>
);

UploadDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        filename: PropTypes.string,
    })).isRequired,
    setImages: PropTypes.func.isRequired,
};

export default UploadDialog;
