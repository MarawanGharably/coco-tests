import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { apiCreateHotspotByType, deleteHotspotAPI, updateHotspotAPI } from '../../../../APImethods';
import { RangeInputSet, NumberSelector } from '../../../ReduxForms/_formFields';
import styles from './ImageMarkerUIForm.module.scss';
import { sleep } from '../../../../utils';
const HOTSPOT_TYPE = 'product_image';

const ImageMarkerUIForm = (props) => {
    const { Marker, Modal, handleSubmit, initialize } = props;
    const formData = useSelector((state) => state['form']['ImageMarkerUIForm']) || {};
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const formValues = formData['values'] || {};

    const dispatch = useDispatch();
    const router = useRouter();
    const storeId = router.query?.id;
    const { userData } = Marker;
    const record = userData?._id ? userData : false;

    //Initialize Form Values in Redux State
    useEffect(() => {
        initialize({
            _id: record?._id,
            scale: Marker?.scale.x || 3,
            renderOrder: Marker?.renderOrder || 1,
        });

        if (!record?._id) createRecord();
    }, [Marker.uuid]);

    const createRecord = async () => {
        await sleep(500);
        const HOTSPOT_TYPE = 'product_image';
        apiCreateHotspotByType(HOTSPOT_TYPE, storeId, currentSceneId, {
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: Marker.transforms.colliderTransform.elements,
            transform: Marker.transforms.visualTransform.elements,
            props: {
                show_icon: true, //Where it used?
                renderOrder: userData.renderOrder,
                scale: userData.scale,
                hotspot_type: HOTSPOT_TYPE,
                image: userData.imageId,
            },
        })
            .then((res) => {
                props.change('_id', res._id);
                Marker.setUserData(res); //Update Marker
            })
            .catch((err) => {
                console.error('-Error', err);
            });
    };

    //Update Scale
    useEffect(() => {
        const isChanged = formData.initial?.scale !== formValues.scale;
        //prevent execution on init
        //do not allow empty val to be submitted
        if (isChanged && formValues.scale >= 0.5) {
            console.log('%c __ Scale UPDATE run', 'color:blue', { formData, formValues });
            Marker.setScale(formValues.scale);
            props.submit();
        }
    }, [formValues.scale]);

    //Update Order
    useEffect(() => {
        const isChanged = formData.initial?.renderOrder !== formValues.renderOrder;
        //prevent update on init
        if (isChanged) {
            console.log('%c __ update RenderOrder', 'color:blue', { props });
            Marker.setRenderOrder(formValues.renderOrder);
            props.submit();
        }
    }, [formValues.renderOrder]);

    const handleDelete = () => {
        const id = formValues._id;

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
        const _id = values._id;
        if (!_id || !props.initialized) return;
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
            },
        };

        dispatch(updateHotspotAPI(_id, storeId, currentSceneId, postData))
            .then((res) => {
                Marker.setUserData(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles['cmp']}>
            <Field name="renderOrder" label="Order:" component={NumberSelector} variant='light' />
            <Field name="scale" label="Size:" min={0.5} max={10} step={0.01} component={RangeInputSet} variant='light' dMode='inline' />

            <div className={styles['actions']}>
                <Button variant="primary" onClick={(e) => Modal.closeModal()}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </Form>
    );
};

// ImageMarkerUIForm.propTypes = {};
// const validate=(values)=>{
//     console.log('--validate', values);
//     const errors = {};
//     if (!values.scale || values.scale ==='' ) errors.scale = 'scale cannot be empty';
//     return errors;
// }

export default reduxForm({
    form: 'ImageMarkerUIForm',
    destroyOnUnmount: true,
    enableReinitialize: false,
    // validate,
})(ImageMarkerUIForm);
