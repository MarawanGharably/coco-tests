import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import debounce from 'lodash.debounce';

import Modal from '../modal/Modal';
import SubmitButton from '../FormComponents/SubmitButton';
import TextInput from '../FormComponents/TextInput';
import FancyButton from '../fancy-button/FancyButton';
import { useUIManager } from '../../three-js/ui-manager/UIManager';
import { apiCreateHotspotByType, apiUpdateHotspotByType, apiDeleteHotspotByType } from '../../utils/apiUtils';

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

const TaggingModal = ({ productSKU = '', onClose, updateState, uuid, dispose, getTransforms, id}) => {
    const [SKU, setSKU] = useState(productSKU);
    const [UIState] = useUIManager();
    const { selectedStoreId } = useSelector(state => state['HomePageStore']);
    const { currentSceneId }  = useSelector(state => state['SceneEditor']);


    const hotspotType = 'product';




    useEffect(() => {
        const currentData = UIState.stateManager.get(uuid);
        if (currentData) {
            setSKU(currentData.uiState.sku);
        }
    }, [UIState, uuid]);

    const handleChange = (e) => {
        const value = e.target.value.trim();
        setSKU(value);
    };

    const handleSave = debounce(async () => {
        if (!SKU) {
            dispose();
            return;
        }
        updateState({ sku: SKU });
        const transforms = getTransforms();
        const { colliderTransform, visualTransform } = transforms;

        const postData = {
            type: hotspotType,
            scene_id: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                product_sku: SKU,
                hotspot_type: hotspotType,
            },
        };

        if (id) {
            try {
                const response = await apiUpdateHotspotByType(
                    hotspotType, selectedStoreId, id, postData,
                );

                updateState({
                    type: response.props.hotspot_type,
                    id: response._id.$oid, //eslint-disable-line
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const response = await apiCreateHotspotByType(
                    hotspotType, selectedStoreId, postData,
                );

                updateState({
                    type: response.props.hotspot_type,
                    id: response._id.$oid, //eslint-disable-line
                });
            } catch (err) {
                console.error(err);
                dispose();
            }
        }
        onClose();
    }, 200);

    const handleDelete = debounce(async () => {
        try {
            await apiDeleteHotspotByType(hotspotType, selectedStoreId, id);
            updateState({ sku: '' });

            dispose();
        } catch (err) {
            console.error('Hotspot deletion failed\n', err);
            dispose();
        }
    }, 200);

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
                <div style={{ margin: '0 2em 2em' }}>
                    <TextInput type="text" placeholder="Enter SKU" handleChange={handleChange} value={SKU} focusOnMount />
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
    getTransforms: PropTypes.func.isRequired,
    productSKU: PropTypes.string.isRequired,
    id: PropTypes.string,
};

TaggingModal.defaultProps = {
    id: '',
};

export default TaggingModal;
