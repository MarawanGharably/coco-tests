import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../modal/Modal';
import ImageList from './image-list/ImageList';
import UploadFooter from './upload-footer/UploadFooter';

import {
    Container,
} from './styles';

const UploadDialog = ({ onClose, images: initialImages }) => {
    const [images, setImages] = useState(initialImages);

    return (
        <Modal onClose={onClose}>
            <Container>
                <ImageList images={images} setImages={setImages} />
                <UploadFooter images={images} closeDialog={onClose} />
            </Container>
        </Modal>
    );
};

UploadDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        filename: PropTypes.string,
    })).isRequired,
};

const withOpen = (Component) => (props) => (
    props.isOpen && <Component {...props} /> //eslint-disable-line
);

const DialogWithOpen = withOpen(UploadDialog);

export default DialogWithOpen;
