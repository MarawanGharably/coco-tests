import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Modal, Button } from 'react-bootstrap';
import TextInput from '../FormComponents/TextInput';
import { useUIManager } from '../../three-js/_contextDataManagers/UIManager';
import {apiCreateHotspotByType, updateHotspotAPI, deleteHotspotAPI} from '../../APImethods/HotspotsAPI';

import styles from './TaggingModal.module.scss';

const TaggingModal = ({ productSKU = '', onClose, updateState, uuid, dispose, getTransforms, id}) => {
    const [SKU, setSKU] = useState(productSKU);
    const [UIState] = useUIManager();
    const router = useRouter();
    const {id:selectedStoreId} = router.query;
    const { currentSceneId }  = useSelector(state => state['SceneEditor']);
    const dispatch = useDispatch();
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
            type: "HotspotMarker",
            scene: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                show_icon: true, //Where it used???
                product_sku: SKU,
                hotspot_type: hotspotType,
            },
        };

        if (id) {
            try {
                // ATTENTION: validation is force disabled for product hotspots to bypass SKU validation. In future, please make this a frontend toggle
                const response = await dispatch(updateHotspotAPI(id, selectedStoreId, currentSceneId, postData , false));

                updateState({
                    type: response.props.hotspot_type,
                    id: response._id, //eslint-disable-line
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                // ATTENTION! validation is disabled, when extending should be instead made a frontend toggle only for product hotspots
                const response = await apiCreateHotspotByType(
                    hotspotType, selectedStoreId, currentSceneId, postData, false
                );

                updateState({
                    type: response.props.hotspot_type,
                    id: response._id, //eslint-disable-line
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
            await deleteHotspotAPI(id, selectedStoreId, currentSceneId);
            updateState({ sku: '' });
            dispose();
        } catch (err) {
            console.error('Hotspot deletion failed\n', err);
            dispose();
        }
    }, 200);

    const handleClose = debounce(() => {
        if (!SKU) {
            dispose();
        } else {
            onClose();
        }
    }, 250);

    return (
        <Modal show onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Product Hotspot</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="flex flex-vertical-center flex-column full-width full-height">
                    <header className={styles["tagging-modal-header"]}>SKU</header>
                    <div className={styles["tagging-modal-input"]}>
                        <TextInput type="text" placeholder="Enter SKU" handleChange={handleChange} value={SKU} focusOnMount />
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
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
