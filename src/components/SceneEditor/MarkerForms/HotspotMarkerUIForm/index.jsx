import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import { Button } from 'react-bootstrap';
import { apiCreateHotspotByType, updateHotspotAPI, deleteHotspotAPI } from '../../../../APImethods/HotspotsAPI';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../ReduxForms/_formFields';
import SubmitButton from '../../../ReduxForms/commonUI/SubmitButton';
import styles from './hotspotMarkerUIForm.module.scss';

const HotspotMarkerUIForm = (props) => {
    const { Marker, Modal, handleSubmit, initialize } = props;
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const dispatch = useDispatch();
    const router = useRouter();

    const selectedStoreId = router?.query?.id;
    const hotspotType = 'product';

    //Hotspot record
    let record = Marker.userData;
    const _ID = useRef(); //reference for record id
    //TODO: use props.change('_id', res._id);



    //Init Marker values
    useEffect(() => {
        _ID.current = record?._id; //Important! set value here
        initialize({
            product_sku: record?.props?.product_sku || '',
        });
    }, [Marker.uuid]);

    //Unmount. Unsaved marker/record cleanup
    useEffect(() => () => removeMarkerIfNotSaved(), [_ID, Marker.uuid]);

    const removeMarkerIfNotSaved = () => {
        const id = _ID.current;
        if (!id) {
            // console.log('%c -remove ', 'color:orange', { id });
            Marker.removeFromScene();
        }
    };

    const handleDelete = debounce(async () => {
        const recordID = record?._id;

        if (!recordID) {
            Modal.closeModal();
            return;
        }

        deleteHotspotAPI(recordID, selectedStoreId, currentSceneId)
            .then((res) => {
                Marker.removeFromScene(); // old dispose(); //delete marker
                Modal.closeModal();
            })
            .catch((err) => {
                console.error('Hotspot deletion failed', err);
            });
    }, 200);

    const onSubmit = async (values) => {
        const recordID = record?._id;
        // console.log('TM:onSubmit', recordID );
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

        //Update
        if (recordID) {
            // ATTENTION: validation is force disabled for product hotspots to bypass SKU validation. In future, please make this a frontend toggle
            dispatch(updateHotspotAPI(recordID, selectedStoreId, currentSceneId, postData, false))
                .then((res) => {
                    Marker.setUserData(res);
                    Modal.closeModal();
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        //Create
        else {
            // ATTENTION! validation is disabled, when extending should be instead made a frontend toggle only for product hotspots
            apiCreateHotspotByType(hotspotType, selectedStoreId, currentSceneId, postData, false)
                .then(async (res) => {
                    _ID.current = res._id; //save value to prevent new record being removed from the scene

                    Marker.setUserData(res); //store new record {} in marker.userData prop
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
            <Field name="product_sku" label="Enter SKU" component={Input} variant='light' />

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
