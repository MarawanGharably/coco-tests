import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import { deleteHotspotProduct } from '../../../../../APImethods/HotspotsAPI';
import styles from './Product.module.scss';

import { PRODUCT_PLACEMENT } from '../../../ModeSelector/modeOptions';

//TODO: use connect only once on parent level


const Product = ({ id, storeId, mode, imageUrl, folderId }) => {
    const dispatch = useDispatch();
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
        dispatch(deleteHotspotProduct(storeId, id));
    };

    return (
        <div className={styles['product-list-item']}>
            <img className={styles['image']} src={imageUrl} alt="black coat" draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd} />

            <div className={styles['delete']} onClick={(e) => setDialogOpen(true)}>
                <i className="far fa-trash-alt"></i>
                Delete Product
            </div>

            <ConfirmationDialog
                title="Are you sure you want to delete this product?"
                content="It will be removed from all scenes"
                show={isDialogOpen}
                confirmLabel="Delete"
                onHide={(e) => setDialogOpen(false)}
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

const mapStateToProps = ({ productLibrary }) => {
    return { mode: productLibrary.mode };
};

export default connect(mapStateToProps, {})(Product);
