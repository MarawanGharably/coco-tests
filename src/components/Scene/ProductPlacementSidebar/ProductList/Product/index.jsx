import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import { PRODUCT_PLACEMENT } from '../../../../../store/types/productLibrary';
import { deleteProductImageFromFolder } from '../../../../../APImethods';
import { formURL } from '../../../../../utils/urlHelper';
import styles from './Product.module.scss';

const Product = ({ id, storeId, image, folder }) => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state['productLibrary']);
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
        e.dataTransfer.setData('folderId', folder);
        e.dataTransfer.setData('imageId', id);
    };

    const onDragEnd = () => {
        if (!draggable) return;

        const overlay = document.querySelector('#drag-overlay');
        overlay.remove();
    };

    const handleDelete = () => {
        dispatch(deleteProductImageFromFolder(storeId, id, folder)).then((res) => {
            setDialogOpen(false);
        });
    };

    return (
        <div className={styles['product-list-item']}>
            <img
                className={styles['image']}
                src={formURL(image)}
                alt="black coat"
                draggable={draggable}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />

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
    image: PropTypes.string.isRequired,
    folder: PropTypes.string.isRequired,
};

export default Product;
