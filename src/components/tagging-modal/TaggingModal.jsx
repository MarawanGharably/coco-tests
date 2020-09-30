import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { css } from '@emotion/react';
import Modal from '../modal/Modal';
import SubmitButton from '../submit-button/SubmitButton';
import TextInput from '../text-input/TextInput';
import FancyButton from '../fancy-button/FancyButton';
import { useUIManager } from '../../three-js/ui-manager/UIManager';

const taggingButtonStyle = css`
width: 10em;
height: 4em;
margin: 0 0.5em;
`;

const deleteButtonStyle = css`
background: white;
border: none;
`;

const deleteTextStyle = css`
text-decoration: underline;
color: black;
`;

const TaggingModal = ({
    onClose, updateState, uuid, dispose,
}) => {
    const [SKU, setSKU] = useState('');
    const [UIState] = useUIManager();

    useEffect(() => {
        const currentData = UIState.stateManager.get(uuid);
        if (currentData) {
            setSKU(currentData.uiState.sku);
        }
    }, [UIState, uuid]);

    const handleChange = (e) => {
        setSKU(e.target.value);
    };

    const handleSave = () => {
        updateState({ sku: SKU });
        onClose();
    };

    const handleDelete = () => {
        updateState({ sku: '' });
        dispose();
    };

    const handleClose = () => {
        if (!SKU) {
            dispose();
        } else {
            onClose();
        }
    };

    return (
        <Modal onClose={handleClose}>
            <div className="flex flex-vertical-center flex-column full-width full-height">
                <header className="tagging-modal-header">SKU</header>
                <div style={{ margin: '0 0 2em' }}>
                    <TextInput type="text" placeholder="Enter SKU" handleChange={handleChange} value={SKU} />
                </div>
                <div className="flex">
                    <SubmitButton buttonText="SAVE" buttonStyle={taggingButtonStyle} onClick={handleSave} />
                    <FancyButton text="DELETE" buttonStyle={[taggingButtonStyle, deleteButtonStyle]} textStyle={deleteTextStyle} onClick={handleDelete} />
                </div>
            </div>
        </Modal>
    );
};

TaggingModal.propTypes = {
    updateState: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    dispose: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
};

export default TaggingModal;
