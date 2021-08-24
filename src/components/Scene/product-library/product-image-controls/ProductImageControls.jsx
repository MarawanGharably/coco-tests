import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RangeInputForm from './form/RangeInputForm';
import { useUIManager } from '../../../../three-js/ui-manager/UIManager';
import styles from './ProductImageControls.module.scss';
import { debounce } from '../../../../utils/events';
import { apiCreateHotspotByType, apiDeleteHotspotByType, apiUpdateHotspotByType } from '../../../../APImethods';

const HOTSPOT_TYPE = 'product_image';

const ProductImageControls = ({
    id: currentId,
    uuid,
    imageId,
    folderId,
    scale,
    renderOrder,
    setScale,
    setRenderOrder,
    onClose,
    dispose,
    getTransforms,
    updateState,
}) => {
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const [id, setId] = useState(currentId);
    const [order, setOrder] = useState(renderOrder);
    const router = useRouter();
    const { id: storeId } = router.query;
    const [UIState] = useUIManager();

    const parsePostData = ({ scale, renderOrder, imageId, folderId }) => {
        const transforms = getTransforms();
        const { colliderTransform, visualTransform } = transforms;

        return {
            type: HOTSPOT_TYPE,
            scene_id: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                renderOrder,
                hotspot_type: HOTSPOT_TYPE,
                scale,
                ...(imageId
                    ? {image_id: imageId}
                    : {}),
                ...(folderId
                    ? {folder_id: folderId }
                    : {}),
            },
        };
    };

    const handleHotspotChange = ({ id, storeId, scale, renderOrder, imageId, folderId }) => {
        const postData = parsePostData({ scale, renderOrder, imageId, folderId });

        if (id) {
            apiUpdateHotspotByType(HOTSPOT_TYPE, storeId, id, postData).catch((err) => {
                console.error(err);
            });
        } else {
            apiCreateHotspotByType(HOTSPOT_TYPE, storeId, postData)
                .then((res) => {
                    updateState({
                        type: res.props.hotspot_type,
                        id: res._id.$oid, //eslint-disable-line
                        scale: res.props.scale,
                        renderOrder: res.props.renderOrder,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    dispose();
                });
        }
    };

    const createProductImage = (uiStateId) => {
        if (!uiStateId) {
            handleHotspotChange({
                storeId,
                imageId,
                scale,
                renderOrder,
                folderId,
            });
        }
    };

    useEffect(() => {
        const currentData = UIState.stateManager.get(uuid);

        if (currentData) {
            setId(currentData.uiState.id);
            setScale(currentData.uiState.scale);
            setOrder(currentData.uiState.renderOrder);
            createProductImage(currentData.uiState.id);
        } else {
            updateState({ id: currentId, scale, renderOrder });
        }
    }, [UIState]);

    const handleOrderChange = debounce((e) => {
        const { value } = e.target;
        const renderOrder = parseInt(value, 10);
        handleHotspotChange({ id, storeId, renderOrder });

        updateState({ renderOrder: renderOrder });
        setOrder(renderOrder);
        setRenderOrder(renderOrder); //call marker method??
    }, 1000);

    const handleScaleChange = (e) => {
        const { value } = e.target;
        const scale = parseFloat(value, 10);

        handleHotspotChange({ id, storeId, scale });
        updateState({ scale });
        setScale(scale); //call marker method???
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        apiDeleteHotspotByType(HOTSPOT_TYPE, storeId, id)
            .then((res) => {
                dispose();
            })
            .catch((err) => {
                console.error('Hotspot deletion failed\n', err);
            });
        onClose();
    };

    return (
        <div className={styles['product-image-controls']}>
            <RangeInputForm order={order} handleOrderChange={handleOrderChange} scale={scale} handleScaleChange={handleScaleChange} />
            <div className={styles['actions']}>
                <Button variant="primary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

ProductImageControls.propTypes = {
    id: PropTypes.string,
    uuid: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    scale: PropTypes.number,
    renderOrder: PropTypes.number,
    setScale: PropTypes.func.isRequired, //marker method?
    setRenderOrder: PropTypes.func.isRequired, //marker method?
    onClose: PropTypes.func.isRequired,
    dispose: PropTypes.func.isRequired,
    getTransforms: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,
};

ProductImageControls.defaultProps = {
    id: '',
    scale: 3,
    renderOrder: 1,
};

export default ProductImageControls;
