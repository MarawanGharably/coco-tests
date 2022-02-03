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
    const [_, setImageData] = useState({});
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


    //TODO: imageFile, imageURL
    const onSubmit = async ({ imageData, ...values }) => {
console.log('--onSubmit',{imageData, values} );

        var postData={
            type: 'HotspotMarker',
            scene: currentSceneId,
            collider_transform: Marker.transforms.colliderTransform.elements,
            transform: Marker.transforms.visualTransform.elements,
            props_translations:values.props_translations,
            props: {
                ...(values.props),
                hotspot_type: 'image',
                show_icon: true, //Where it used?
                // locale: '',
                // imageURL: values.imageURL,
                renderOrder: 50,
            },
        };

        //Update
        if(record._id){
            postData.props.image = Marker.userData.props.image;
            return dispatch(updateHotspotAPI(record._id, storeId, currentSceneId, postData, false ))
                .then(res=>{
                    Marker.setUserData(res);
                })
                .catch((err) => console.log(err));
        }
        //Create
        else{
            if (imageData.imageFile){
                const newImageData =  await dispatch(addProductImageToFolder(storeId, folderId, [imageData.imageFile]));
                console.log(newImageData?.[0]?._id)
                postData.props.image = newImageData?.[0]?._id;
            }
            return apiCreateHotspotByType('image', storeId, currentSceneId, postData)
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
            },
            props_translations: record.props_translations,
            locale: 'en_US',
            imageData:{
                imageURL: ''
            }
        });
    }, [Marker.uuid]);

     useEffect(() => {
        const isChanged = formData.initial?.props.scale !== formValues.props?.scale;
        if (isChanged) Marker.setScale(formValues.props.scale);
    }, [formValues.props?.scale]);

    useEffect(() => {
        const isChanged = formData.initial?.props.horizontalArea !== formValues.props?.horizontalArea;
        if (isChanged){
            // Marker.setColliderHorizontalScale(formValues.props.horizontalArea)
            console.log(Marker)
        }
    }, [formValues.props?.horizontalArea]);

    useEffect(() => {
        const isChanged = formData.initial?.props.verticalArea !== formValues.props?.verticalArea;
        if (isChanged){
            // Marker.setColliderVerticalScale(formValues.props.verticalArea)
            console.log(Marker)
        }
    }, [formValues.props?.verticalArea]);

    

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
            <Field name='props.scale' label="Hotspot Size" component={RangeInputSet} rangeVariant='obsessColors'  min={0.5} step={0.1}/>
            <Field name='props.horizontalArea' label="Hotspot Clickable Area (Horizontally)" component={RangeInputSet} dMode='rows' rangeVariant='obsessColors' min={0.5} step={0.1}/>
            <Field name='props.verticalArea' label="Hotspot Clickable Area (Vertically)" component={RangeInputSet} dMode='rows' rangeVariant='obsessColors'  min={0.5} step={0.1}/>

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
    if(values.props?.scale<0.5) errors.scale = 'Cannot be less than 0.5';

    //By default, horizontalArea & verticalArea === image scale
    //horizontalArea & verticalArea cannot be less than image scale
    if(values.props?.horizontalArea < values.props?.scale) errors.horizontalArea = 'Cannot be less than Hotspot Size';
    if(values.props?.verticalArea < values.props?.scale) errors.verticalArea = 'Cannot be less than  Hotspot Size';
    return errors;
};

export default reduxForm({
    form: 'ImageHotspotForm',
    destroyOnUnmount: true,
    enableReinitialize: false,
    validate,
})(ImageHotspotForm);