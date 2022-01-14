import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Form, Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { apiCreateHotspotByType } from '../../../../APImethods';
import { Input, Select, RangeInputSet } from '../../../ReduxForms/_formFields';
import FileUploadTabs from '../../../FileUploadTabs'
import styles from './ImageHotspot.module.scss';


let ImageHotspotForm = ({ Marker, initialize, handleSubmit }) => {
    const router = useRouter();
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const formData = useSelector((state) => state['form']['ImageHotspotForm']) || {};
    const formValues = formData['values'] || {};
    const storeId = router.query?.id;
    let record = Marker.userData;

    const onSubmit = (values) => {
        
        apiCreateHotspotByType('product_image', storeId, currentSceneId, {
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: Marker.transforms.colliderTransform.elements,
            transform: Marker.transforms.visualTransform.elements,
            props: {
                show_icon: true, //Where it used?
                scale: values.hotspotSize,
                horizontalArea: values.horizontalArea,
                verticalArea: values.verticalArea,
                locale: values.localeSelection,
                imageTitle: values.imageTitle,
                imageSubtitle: values.imageSubtitle,
                imageURL: values.imageURL,
                buttonCopy: values.buttonCopy,
                buttonURL: values.buttonURL,
                image: '61707384e412887766152f5a',
                renderOrder: 50,
                hotspot_type: 'product_image',
            },
        }).then(res=>{

        }).catch(err=>{

        });
    }

    useEffect(() => {
        initialize({
            hotspotSize: record?.props?.scale,
            horizontalArea: record?.props?.horizontalArea,
            verticalArea: record?.props?.verticalArea,
            localeSelection: record?.props?.locale,
            imageTitle: record?.props?.imageTitle,
            imageSubtitle: record?.props?.imageSubtitle,
            imageURL: record?.props?.image?.image?.path,
            buttonCopy: record?.props?.buttonCopy,
            buttonURL: record?.props?.buttonURL,
        });
    }, [Marker.uuid]);

    useEffect(() => {
        const isChanged = formData.initial?.hotspotSize !== formValues.hotspotSize;
        if (isChanged) Marker.setScale(formValues.hotspotSize);
    }, [formValues.hotspotSize]);

    const localeOptions = [
        { label: "en_US", value: "en_US" },
        { label: "en_UK", value: "en_UK" },
        { label: "en_INT", value: "en_INT" },
        { label: "en_IN", value: "en_IN" },
        { label: "es_ES", value: "es_ES" },
        { label: "de_DE", value: "de_DE" },
        { label: "ja_JP", value: "ja_JP" },
    ]

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles['form']} style={{marginBottom:'4em'}} >
            <Field name='hotspotSize' label="Hotspot Size" component={RangeInputSet} step = {0.1}/>
            <Field name='horizontalArea' label="Hotspot Clickable Area (Horizontally)" component={RangeInputSet} step = {0.1}/>
            <Field name='verticalArea' label="Hotspot Clickable Area (Vertically)" component={RangeInputSet} step = {0.1}/>
            <Field name='localeSelection' label="Select Locale" component={Select} options={localeOptions} className={styles["selector"]}/>
            <Field name='imageTitle' label="Image Title" component={Input}/>
            <Field name='imageSubtitle' label="Image Subtitle" component={Input}/>
            <Field name='imageUpload' label="Image Upload" component={FileUploadTabs} type='image' />
            <Field name='buttonCopy' label="Button Copy" component={Input}/>
            <Field name='buttonURL' label="Button URL" component={Input}/>
        </Form>
    );
};



const validate = (values) => {
    const errors = {};
    return errors;
};

export default reduxForm({
    form: 'ImageHotspotForm',
    destroyOnUnmount: true,
    enableReinitialize: false,
    validate,
})(ImageHotspotForm);

