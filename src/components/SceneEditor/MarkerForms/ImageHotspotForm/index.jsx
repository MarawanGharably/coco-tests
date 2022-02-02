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
    const dispatch = useDispatch();
    const { currentSceneId } = useSelector((state) => state['SceneEditor']);
    const { selectedFolder } = useSelector((state) => state['productLibrary']);
    const folderId = selectedFolder?.value;
    const formData = useSelector((state) => state['form']['ImageHotspotForm']) || {};
    const formValues = formData['values'] || {};
    const [localeOptions, setLocaleOptions] = useState([]);
    const [imageData, setImageData] = useState({});
    const storeId = router.query?.id;
    let record = Marker.userData;

    const reader = new FileReader();
    // reader.addEventListener("load", function () {
    //     setImageData({
    //         folder: folderId,
    //         content: reader.result,
    //         filename: formValues.imageFile?.name || formValues.imageURL,
    //         remove_background: false,
    //     });
    // },false);

    const onSubmit = async (values) => {

        const newImageData = Object.keys(imageData).length>0 ?  await dispatch(addProductImageToFolder(storeId, folderId, [imageData])) : null;



        const postData={
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: Marker.transforms.colliderTransform.elements,
            transform: Marker.transforms.visualTransform.elements,
            props_translations:values.props_translations,
            props: {
                ...(values.props),
                hotspot_type: 'product_image',
                show_icon: true, //Where it used?
                // locale: '',
                // imageURL: values.imageURL,
                image:  newImageData?.[0]?._id || null, //TODO: what if no new image
                renderOrder: 50,
            },
        };

        //Update
        if(record._id){
            return dispatch(updateHotspotAPI(record._id, storeId, currentSceneId, postData, false ))
                .then(res=>{
                    Marker.setUserData(res);
                })
                .catch((err) => console.log(err));
        }
        //Create
        else{
            return apiCreateHotspotByType('product_image', storeId, currentSceneId, postData)
                .then(res=>{
                    Marker.setUserData(res);
                })
                .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        storeId &&
            getStoreLocale(storeId)
                .then((res) => {
                    let locales = res.locales.map((locale) => ({label:locale, value:locale}));
                    setLocaleOptions(locales);
                })
                .catch((err) => console.log(err));
    }, [storeId]);

    useEffect(() => {
        initialize({
            props:{
                scale: record?.props?.scale,
                //By default, horizontalArea & verticalArea === image scale
                horizontalArea: record?.props?.horizontalArea || record?.props?.scale,
                verticalArea: record?.props?.verticalArea || record?.props?.scale,
                buttonCopy: record?.props?.buttonCopy,
                buttonURL: record?.props?.buttonURL,
                imageURL: record?.props?.image?.image?.path,
            },
            props_translations: record.props_translations,
            locale: 'en_US',
        });
    }, [Marker.uuid]);

    useEffect(() => {
        const isChanged = formData.initial?.scale !== formValues.scale;
        if (isChanged) Marker.setScale(formValues.scale);
    }, [formValues.scale]);

    

    useEffect(() => {
        if (formValues.imageURL !== formData.initial?.imageURL) {
            (async function() {
                let blob = await fetch(formValues.imageURL).then(r => r.blob());
                reader.readAsDataURL(blob);
            })();
        }
    }, [formValues.imageURL]);



    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles['form']}  >
            <Field name='props.scale' label="Hotspot Size" component={RangeInputSet}  variant='obsessColors' min={0.5} step={0.1}/>
            <Field name='props.horizontalArea' label="Hotspot Clickable Area (Horizontally)" component={RangeInputSet} dMode='rows' variant='obsessColors' min={0.5} step={0.1}/>
            <Field name='props.verticalArea' label="Hotspot Clickable Area (Vertically)" component={RangeInputSet} dMode='rows' variant='obsessColors' min={0.5} step={0.1}/>

            {/* Localization */}
            <Field name='locale' label="Select Locale" component={Select} options={localeOptions} mode='dark' className={styles["selector"]}/>
            <Field name={`props_translations.${formValues.locale}.imageTitle`} label="Image Title" component={Input}/>
            <Field name={`props_translations.${formValues.locale}.imageSubtitle`} label="Image Subtitle" component={Input}/>

            {/*<Field name='imageUpload' label="Image Upload" component={FileUploadTabs} type='image' />*/}
            <Field name='imageData' label="Image" component={FileUploadTabs} type='image' />
            <Field name={`props_translations.${formValues.locale}.buttonCopy`} label="Button Copy" component={Input}/>
            <Field name='props.buttonURL' label="Button URL" component={Input}/>
        </Form>
    );
};


//TODO:
const validate = (values) => {
    const errors = {};
    if(values.scale<0.5) errors.scale = 'Cannot be less than 0.5';

    //By default, horizontalArea & verticalArea === image scale
    //horizontalArea & verticalArea cannot be less than image scale
    if(values.horizontalArea < values.scale) errors.horizontalArea = 'Cannot be less than Hotspot Size';
    if(values.verticalArea < values.scale) errors.verticalArea = 'Cannot be less than  Hotspot Size';
    return errors;
};

export default reduxForm({
    form: 'ImageHotspotForm',
    destroyOnUnmount: true,
    enableReinitialize: false,
    validate,
})(ImageHotspotForm);