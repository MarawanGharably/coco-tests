import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import styles from './Product.module.scss';
import { PRODUCT_PLACEMENT } from "../../../../../store/types/productLibrary";
import { deleteProductImageFromFolder } from "../../../../../APImethods";
import { formURL } from "../../../../../utils/urlHelper";

//TODO: use connect only once on parent level

const Product = ({ id, storeId, mode, image, folder }) => {
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
        e.dataTransfer.setData('folderId', folder);
        e.dataTransfer.setData('imageId', id);
    };

    const onDragEnd = () => {
        if (!draggable) return;

        const overlay = document.querySelector('#drag-overlay');

        overlay.remove();
    };

    const handleDelete = () => {
        dispatch(deleteProductImageFromFolder(storeId, id, folder));
    };

    return (
        <div className={styles['product-list-item']}>
            <img className={styles['image']} src={formURL(image)} alt="black coat" draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd} />

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

const mapStateToProps = ({ productLibrary }) => {
    return { mode: productLibrary.mode };
};

export default connect(mapStateToProps, {})(Product);
