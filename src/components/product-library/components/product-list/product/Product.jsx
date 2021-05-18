import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../../../../fancy-button/FancyButton';
import useAPI from '../../../hooks/useAPI';
import { useProductLibrary } from '../../../store/ProductLibraryStore';
import ConfirmationDialog from '../../../../confirmation-dialog/ConfirmationDialog';

import {
    Container,
    Image,
    deleteButtonStyle,
} from './styles';

import {
    PRODUCT_PLACEMENT,
} from '../../../../mode-selector/modeOptions';

const Product = ({ id, imageUrl, folderId }) => {
    const { deleteProduct } = useAPI();
    const [{ mode }, dispatch] = useProductLibrary();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const draggable = mode === PRODUCT_PLACEMENT;

    const onDragStart = (e) => {
        if (!draggable) return;

        const container = document.querySelector('#canvas-wrapper');
        const overlay = document.createElement('div');

        overlay.id = 'drag-overlay';
        overlay.innerHTML = 'Drop the image here to add to the scene';

        container.appendChild(overlay);
        e.dataTransfer.setData('id', id);
        e.dataTransfer.setData('folderId', folderId);
        e.dataTransfer.setData('imageUrl', imageUrl);
    };

    const onDragEnd = () => {
        if (!draggable) return;

        const overlay = document.querySelector('#drag-overlay');

        overlay.remove();
    };

    const handleDelete = () => {
        deleteProduct(dispatch, id);
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Container full-width full-height>
            <Image
                src={imageUrl}
                alt="black coat"
                draggable={draggable}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
            <FancyButton
                text="DELETE"
                buttonStyle={deleteButtonStyle}
                onClick={openDialog}
            />
            <ConfirmationDialog
                title="Are you sure you want to delete this product?"
                content="It will be removed from all scenes"
                isOpen={isDialogOpen}
                onClose={closeDialog}
                handleDelete={handleDelete}
            />
        </Container>
    );
};

Product.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
};

export default Product;
