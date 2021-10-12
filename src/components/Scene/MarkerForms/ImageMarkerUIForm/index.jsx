import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { deleteHotspotAPI, updateHotspotAPI } from '../../../../APImethods';
import { RangeInputSet, NumberSelector } from '../../../ReduxForms/_formFields';
import styles from './ImageMarkerUIForm.module.scss';

const HOTSPOT_TYPE = 'product_image';

const ImageMarkerUIForm = (props) => {
    const { Marker, Modal, handleSubmit, initialize, image } = props;
    const formData = useSelector((state) => state['form']['ImageMarkerUIForm']) || {};
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const formValues = formData['values'] || {};
    console.log('--ImageMarkerUIForm', { props });

    const dispatch = useDispatch();
    const router = useRouter();
    const storeId = router.query?.id;
    const record = Marker.userData;
    const id = record?._id;

    //Initialize Form Values in Redux State
    useEffect(() => {
        initialize({
            scale: Marker?.scale.x || 3,
            renderOrder: Marker?.renderOrder || 1,
        });
    }, [id]);

    //Update Scale
    useEffect(() => {
        const isChanged = formData.initial?.scale !== formValues.scale;
        //prevent execution on init
        if (isChanged) {
            console.log('%c __ Scale UPDATE run', 'color:blue', { formData, formValues });
            Marker.setScale(formValues.scale);
            onSubmit();
        }
    }, [formValues.scale]);

    //Update Order
    useEffect(() => {
        const isChanged = formData.initial?.renderOrder !== formValues.renderOrder;
        //prevent update on init
        if (isChanged) {
            console.log('%c __ update RenderOrder', 'color:blue', { props });
            Marker.setRenderOrder(formValues.renderOrder);
            onSubmit();
        }
    }, [formValues.renderOrder]);

    const handleDelete = () => {
        id && deleteHotspotAPI(id, storeId, currentSceneId)
                .then((res) => {
                    Marker.removeFromScene();
                    Modal.closeModal();
                })
                .catch((err) => {
                    console.error(`Hotspot deletion failed`, err);
                });
    };

    const onSubmit = (values = formValues) => {
        if (!record?._id || !props.initialized) return;
        console.log('%c__onSubmit__', 'color:red', { values, record, Marker });

        const { colliderTransform, visualTransform } = Marker.getTransforms();
        const postData = {
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                show_icon: true, //Where it used?
                renderOrder: values.renderOrder,
                scale: values.scale,
                hotspot_type: HOTSPOT_TYPE,
                // image: image._id
            },
        };

        dispatch(updateHotspotAPI(record._id, storeId, currentSceneId, postData))
            .then(res=>{
                Marker.setUserData(res);
            }).catch((err) => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['cmp']}>
            <Field name="renderOrder" label="Order:" component={NumberSelector} />
            <Field name="scale" label="Size:" min={0.5} max={10} step={0.01} component={RangeInputSet} />

            <div className={styles['actions']}>
                <Button variant="primary" onClick={(e) => Modal.closeModal()}>Close</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
        </form>
    );
};

// ImageMarkerUIForm.propTypes = {};

export default reduxForm({
    form: 'ImageMarkerUIForm',
    destroyOnUnmount: true,
    enableReinitialize: false,
    // validate,
})(ImageMarkerUIForm);
