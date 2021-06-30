import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import Form from './form/Form';

import useAPI from './hooks/useAPI';
import { useUIManager } from '../../three-js/ui-manager/UIManager';
import './ProductImageControls.scss';

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
    const [id, setId] = useState(currentId);
    const [size, setSize] = useState(scale);
    const [order, setOrder] = useState(renderOrder);
    const { handleHotspotChange, deleteHotspot } = useAPI({
        getTransforms, dispose, updateState,
    });
    const [UIState] = useUIManager();

    const createProductImage = (uiStateId) => {
        if (!uiStateId) {
            handleHotspotChange({
                imageId, scale, renderOrder, folderId,
            });
        }
    };

    useEffect(() => {
        const currentData = UIState.stateManager.get(uuid);

        if (currentData) {
            setId(currentData.uiState.id);
            setScale(currentData.uiState.scale);
            setSize(currentData.uiState.scale);
            setOrder(currentData.uiState.renderOrder);
            createProductImage(currentData.uiState.id);
        } else {
            updateState({
                id: currentId,
                scale,
                renderOrder,
            });
        }
    }, [UIState]);

    const createTimeout = (newValue, { value, key }) => (
        setTimeout(() => {
            if (newValue !== value) {
                handleHotspotChange({ [key]: newValue, id });
                updateState({ [key]: newValue });
            }
        }, 200)
    );

    useEffect(() => {
        const orderTimeout = createTimeout(order, {
            value: renderOrder,
            key: 'renderOrder',
        });

        return () => clearTimeout(orderTimeout);
    }, [order]);

    useEffect(() => {
        const sizeTimeout = createTimeout(size, {
            value: scale,
            key: 'scale',
        });

        return () => clearTimeout(sizeTimeout);
    }, [size]);

    const handleOrderChange = (e) => {
        const { value } = e.target;
        const parsedValue = parseInt(value, 10);

        setOrder(parsedValue);
        setRenderOrder(parsedValue);
    };

    const handleSizeChange = (e) => {
        const { value } = e.target;
        const parsedValue = parseFloat(value, 10);

        setScale(parsedValue);
        setSize(parsedValue);
    };

    const handleDelete = (e) => {
        e.preventDefault();

        deleteHotspot(id);
        onClose();
    };

    return (
        <div className="product-image-controls">
            <Form
                order={order}
                handleOrderChange={handleOrderChange}
                size={size}
                handleSizeChange={handleSizeChange}
            />
            <div className="product-image-controls-actions">
                <Button variant="primary" onClick={onClose}>Close</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
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
    setScale: PropTypes.func.isRequired,
    setRenderOrder: PropTypes.func.isRequired,
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
