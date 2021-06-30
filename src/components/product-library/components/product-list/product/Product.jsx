import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import ConfirmationDialog from '../../../../confirmation-dialog/ConfirmationDialog';
import { deleteHotspotProduct } from '../../../../../APImethods/HotspotsAPI';
import './Product.scss';

import {
    PRODUCT_PLACEMENT,
} from '../../../../mode-selector/modeOptions';

const Product = ({ mode, id, imageUrl, folderId }) => {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const selectedStoreId = sessionStorage.getItem('STORE_ID');

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
        dispatch(deleteHotspotProduct(selectedStoreId, id))
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div className="product-list-item">
            <img
                className="product-list-item-image"
                src={imageUrl}
                alt="black coat"
                draggable={draggable}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
            <Button
                variant="danger"
                className="product-list-item-delete"
                onClick={openDialog}
            >
                Delete
            </Button>
            <ConfirmationDialog
                title="Are you sure you want to delete this product?"
                content="It will be removed from all scenes"
                show={isDialogOpen}
                confirmLabel="Delete"
                onHide={closeDialog}
                onConfirm={handleDelete}
            />
        </div>
    );
};

Product.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    const { mode } = state.productLibrary;

    return { mode };
};
  
export default connect(
    mapStateToProps,
)(Product);
