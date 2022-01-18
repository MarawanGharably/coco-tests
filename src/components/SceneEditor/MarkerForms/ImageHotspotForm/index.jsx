import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field, reduxForm } from 'redux-form';
import { useRouter } from 'next/router';
import { apiCreateHotspotByType, updateHotspotAPI, getStoreLocale, addProductImageToFolder } from '../../../../APImethods';
import { Input, Select, RangeInputSet } from '../../../ReduxForms/_formFields';
import FileUploadTabs from '../../../ReduxForms/_customFormFields/FileUploadTabs'
import styles from './ImageHotspot.module.scss';


let ImageHotspotForm = ({ Marker, initialize, handleSubmit }) => {
    const router = useRouter();
    const storeId = router.query?.id;
    const dispatch = useDispatch();
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const { folders, selectedFolder } = useSelector((state) => state['productLibrary']);
    const folderId = selectedFolder.value;
    const formData = useSelector((state) => state['form']['ImageHotspotForm']) || {};
    const formValues = formData['values'] || {};
    const [localeOptions, setLocaleOptions] = useState([]);
    const [imageData, setImageData] = useState({});
    let record = Marker.userData;

    const reader = new FileReader();
    reader.addEventListener("load", function () {
        setImageData({
            folder: folderId,
            content: reader.result,
            filename: formValues.imageFile.name,
            remove_background: false,
        });  
    },false);

    const onSubmit = (values) => {

        dispatch(addProductImageToFolder(storeId, folderId, [imageData]))
            .then((res)=>{

                const postData={
                    type: 'HotspotMarker',
                    scene: currentSceneId,
                    collider_transform: Marker.transforms.colliderTransform.elements,
                    transform: Marker.transforms.visualTransform.elements,
                    props: {
                        show_icon: true, //Where it used?
                        scale: values.scale,
                        horizontalArea: values.horizontalArea,
                        verticalArea: values.verticalArea,
                        locale: values.localeSelection,
                        imageTitle: values.imageTitle,
                        imageSubtitle: values.imageSubtitle,
                        imageURL: values.imageURL,
                        buttonCopy: values.buttonCopy,
                        buttonURL: values.buttonURL,
                        image: res[0]._id,
                        renderOrder: 50,
                        hotspot_type: 'product_image',
                    },
                }; 

                if(record._id){
                //Update
                    dispatch(updateHotspotAPI(record._id, storeId, currentSceneId, postData, false ))
                        .then(res=>{
                        })
                        .catch((err) => console.log(err));
                }
                else{
                    //Create
                    apiCreateHotspotByType('product_image', storeId, currentSceneId, postData)
                        .then(res=>{
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err)); 
    }

    useEffect(() => {
        storeId &&
            getStoreLocale(storeId)
                .then((res) => {
                    let locales = res.locales.map((locale) => {return {label:locale, value:locale}})
                    setLocaleOptions(locales);
                })
                .catch((err) => console.log(err));
    }, [storeId]);

    useEffect(() => {
        initialize({
            scale: record?.props?.scale,
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
        const isChanged = formData.initial?.scale !== formValues.scale;
        if (isChanged) Marker.setScale(formValues.scale);
    }, [formValues.scale]);

    useEffect(() => {
        if (formValues.imageFile) reader.readAsDataURL(formValues.imageFile);
    }, [formValues.imageFile]);

//TODO: horizontalArea, verticalArea, imageTitle, imageSubtitle, buttonCopy, buttonURL  does not exist in record

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles['form']} style={{marginBottom:'4em'}} >
            <Field name='scale' label="Hotspot Size" component={RangeInputSet} dMode='rows' min={0.5} step={0.1}/>
            <Field name='horizontalArea' label="Hotspot Clickable Area (Horizontally)" component={RangeInputSet} dMode='rows' min={0.5} step={0.1}/>
            <Field name='verticalArea' label="Hotspot Clickable Area (Vertically)" component={RangeInputSet} dMode='rows' min={0.5} step={0.1}/>
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