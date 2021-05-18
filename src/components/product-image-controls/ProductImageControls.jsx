import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FancyButton from '../fancy-button/FancyButton';
import RangeInput from './range-input/RangeInput';
import Input from '../input/Input';

import useAPI from './hooks/useAPI';
import { useUIManager } from '../../three-js/ui-manager/UIManager';

import {
    productControlsStyle,
    buttonStyle,
    deleteButtonStyle,
    flexStyle,
    buttonsContainerStyle,
} from './styles';

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
    const [order, setOrder] = useState();
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
        <div css={productControlsStyle}>
            <Input labelTitle="Order" type="number" formField="render-order" value={order} handleChange={handleOrderChange} />
            <RangeInput
                handleChange={handleSizeChange}
                value={size}
                min={0.01}
                max={10}
                step={0.01}
            />
            <div css={[flexStyle, buttonsContainerStyle]}>
                <FancyButton text="CLOSE" buttonStyle={buttonStyle} onClick={onClose} />
                <FancyButton text="DELETE" buttonStyle={[buttonStyle, deleteButtonStyle]} onClick={handleDelete} />
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
