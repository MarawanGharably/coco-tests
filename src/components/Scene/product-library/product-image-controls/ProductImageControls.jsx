import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RangeInputForm from './form/RangeInputForm';
import { useUIManager } from '../../../../three-js/ui-manager/UIManager';
import { debounce } from '../../../../utils/events';
import { apiCreateHotspotByType, deleteHotspotAPI, updateHotspotAPI } from '../../../../APImethods';
import styles from './ProductImageControls.module.scss';

const HOTSPOT_TYPE = 'product_image';

const ProductImageControls = ({
    id: currentId,
    uuid,
    image,
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

    //Store data without state update & re-renders + immediate access
    const data = useRef({
        show_icon: true, //Where it used?
        renderOrder,
        scale,
        hotspot_type: HOTSPOT_TYPE,
        // image: image._id
    })



    const getPostData = () => {
        const transforms = getTransforms();
        const { colliderTransform, visualTransform } = transforms;

        return {
            type: "HotspotMarker",
            scene: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: data.current
        };
    };

    const handleHotspotChange = ({ id }) => {
        const postData = getPostData();

        updateHotspotAPI(id, storeId, currentSceneId,  postData).catch((err) => {
            console.error(err);
        });
    };

    const createProductImage = (uiStateId) => {
        if (!uiStateId) {
            const postData = getPostData();
            postData.props.image= image._id;
            apiCreateHotspotByType(HOTSPOT_TYPE, storeId, currentSceneId, postData)
            .then((res) => {
                updateState({
                    type: res.props.hotspot_type,
                    id: res._id, //eslint-disable-line
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
        data.current.renderOrder = renderOrder;

        handleHotspotChange({ id, renderOrder });

        updateState({ renderOrder: renderOrder });
        setOrder(renderOrder);
        setRenderOrder(renderOrder); //call marker method??
    }, 1000);

    const handleScaleChange = (e) => {
        const { value } = e.target;
        const scale = parseFloat(value, 10);
        data.current.scale = scale;
        handleHotspotChange({ id, scale });
        updateState({ scale });
        setScale(scale); //call marker method???
    };

    const handleDelete = (e) => {
        e.preventDefault();

        deleteHotspotAPI(id, storeId, currentSceneId )
            .then((res) => {
                dispose();
            })
            .catch((err) => {
                console.error('Hotspot deletion failed\n', err);
            })
            .finally(()=>{
                onClose();
            });
    };


    return (
        <div className={styles['product-image-controls']}>
            <RangeInputForm
                order={order}
                scale={scale}
                handleOrderChange={handleOrderChange}
                handleScaleChange={handleScaleChange}
            />
            <div className={styles['actions']}>
                <Button variant="primary" onClick={onClose}> Close </Button>
                <Button variant="danger" onClick={handleDelete}> Delete </Button>
            </div>
        </div>
    );
};

ProductImageControls.propTypes = {
    id: PropTypes.string,
    uuid: PropTypes.string.isRequired,
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
