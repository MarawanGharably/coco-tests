import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import { Button } from 'react-bootstrap';
import { apiCreateHotspotByType, updateHotspotAPI, deleteHotspotAPI } from '../../../../APImethods/HotspotsAPI';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../ReduxForms/_formFields';
import SubmitButton from '../../../FormComponents/SubmitButton';
import styles from './hotspotMarkerUIForm.module.scss';

const HotspotMarkerUIForm = (props) => {
    const { Marker, Modal, handleSubmit, initialize } = props;
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const dispatch = useDispatch();
    const router = useRouter();

    const record = Marker.data;
    const id = record?._id;
    const selectedStoreId = router?.query?.id;
    const hotspotType = 'product';

    //Init values
    useEffect(() => {
        initialize({
            product_sku: record?.props?.product_sku || '',
        });

        return () => {
            removeMarkerIfNotSaved();
        };
    }, [Marker.uuid]);

    const removeMarkerIfNotSaved = () => {
        if (!record._id) Marker.removeFromScene();
    };

    const handleDelete = debounce(async () => {
        if (!id) {
            Modal.closeModal();
            return;
        }

        deleteHotspotAPI(id, selectedStoreId, currentSceneId)
            .then((res) => {
                Marker.removeFromScene(); // old dispose(); //delete marker
                Modal.closeModal();
            })
            .catch((err) => {
                console.error('Hotspot deletion failed', err);
            });
    }, 200);

    const onSubmit = async (values) => {
        const transforms = Marker.getTransforms();
        const { colliderTransform, visualTransform } = transforms;

        const postData = {
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: colliderTransform.elements,
            transform: visualTransform.elements,
            props: {
                show_icon: true, //Where it used???
                product_sku: values.product_sku,
                hotspot_type: hotspotType,
            },
        };

        if (id) {
            console.log('TM:updateHotspotAPI');

            // ATTENTION: validation is force disabled for product hotspots to bypass SKU validation. In future, please make this a frontend toggle
            dispatch(updateHotspotAPI(id, selectedStoreId, currentSceneId, postData, false))
                .then((res) => {
                    Marker.setMarkerData(res);
                    Modal.closeModal();
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            // ATTENTION! validation is disabled, when extending should be instead made a frontend toggle only for product hotspots
            apiCreateHotspotByType(hotspotType, selectedStoreId, currentSceneId, postData, false)
                .then((res) => {
                    record._id = res._id; //save value to prevent new record being removed from the scene
                    Marker.setMarkerData(res); //store new record {} in marker.data prop
                    Modal.closeModal();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const onModalClose = () => {
        removeMarkerIfNotSaved();
        Modal.closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['cmp']}>
            <i className={`${styles['closeModalIcon']} fas fa-times`} onClick={onModalClose} />

            <h5 className={styles['title']}>Product Hotspot</h5>
            <Field name="product_sku" label="Enter SKU" component={Input} />

            <div className={`${styles['actionsWrapper']} justify-content-center`}>
                <Button variant="link" className={styles['deleteButton']} onClick={handleDelete}>
                    <span className={styles['deleteLink']}>Delete</span>
                </Button>

                <SubmitButton submitting={false} buttonText="Save" className={`${styles['saveButton']} align-self-center `} />
            </div>
        </form>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.product_sku) errors.product_sku = 'product_sku cannot be empty';

    return errors;
};

export default reduxForm({
    form: 'HotspotMarkerUIForm',
    destroyOnUnmount: true,
    enableReinitialize: false,
    validate,
})(HotspotMarkerUIForm);
