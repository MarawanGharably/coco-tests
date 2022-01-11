import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Form, Field, reduxForm } from 'redux-form';
import { Input, Select, RangeInputSet } from '../../../ReduxForms/_formFields';
import FileUploadTabs from '../../../FileUploadTabs'
import styles from './ImageHotspot.module.scss';

const onSubmit = (values) => {
    console.log(values);
}


let ImageHotspotForm = (props) => {

    const { Marker, initialize, handleSubmit } = props;
    const formData = useSelector((state) => state['form']['ImageHotspotForm']) || {};
    const formValues = formData['values'] || {};

    let record = Marker.userData;

    useEffect(() => {
        initialize({

            hotspotSize: record?.props?.scale,

        });
    }, [Marker.uuid]);

    useEffect(() => {
        const isChanged = formData.initial?.hotspotSize !== formValues.hotspotSize;

        if (isChanged) {

            Marker.setScale(formValues.hotspotSize);
        }
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
        <Form onSubmit={handleSubmit} className={styles['form']}>
            <Field name='hotspotSize' label="Hotspot Size" component={RangeInputSet} step = {0.1}/>
            <Field name='horizontalArea' label="Hotspot Clickable Area (Horizontally)" component={RangeInputSet} step = {0.1}/>
            <Field name='verticalArea' label="Hotspot Clickable Area (Vertically)" component={RangeInputSet} step = {0.1}/>
            <Field name='localeSelection' label="Select Locale" component={Select} options={localeOptions} className={styles["selector"]}/>
            <Field name='imageTitle' label="Image Title" component={Input}/>
            <Field name='imageSubtitle' label="Image Subtitle" component={Input}/>
            <Field name='imageUpload' label="Image Upload" component={FileUploadTabs} type='image' />
            <Field name='buttonCopy' label="Button Copy" component={Input}/>
            <Field name='buttonURL' label="Button URL" component={Input}/>
            <div style={{height:'200px'}}></div>
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
    onSubmit: onSubmit,
    validate,
})(ImageHotspotForm);

