import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components/ReduxForms/_formFields';
import StoreLayout from '../../components/layouts/StoreLayout';
import { getStoreInfo, updateStoreInfo } from '../../APImethods';
import SubmitStatusMessage from '../../components/ReduxForms/SubmitStatusMessage';
import FormWithActionBtns from "../../components/ReduxForms/commonUI/FormWithActionBtns";


let StoreInfoPage = ({ initialize, ...props }) => {
    const router = useRouter();
    const [storeDataLoaded, setStoreData] = useState(false);
    const [status, setStatus] = useState({});
    const { id: storeId } = router.query;

    useEffect(() => {
        storeId && getStoreInfo(storeId)
                .then((res) => {
                    setStoreData(true);
                    initialize({
                        name: res?.name || '',
                        url_slug: res?.url_slug || '',
                    });
                })
                .catch((err) => console.log(err));
    }, [storeId]);

    const onSubmit = (values) => {
       return updateStoreInfo(storeId, values)
            .then((res) => {
                setStatus({ success: true, message: 'Store Info Updated Successfully' });

                setTimeout(() => {
                    router.push(`/store/locale/?id=${storeId}`);
                }, 2000);
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || 'Store Info update failed' });
            });
    };


    return (
        <StoreLayout title="Store Info">
            <SubmitStatusMessage status={status} />
                <FormWithActionBtns dataLoaded={storeDataLoaded} onSubmit={onSubmit} fieldsWrapperStyle={{ maxWidth: '40em' }} {...props}>
                    <Field name="name" label="Store Name" component={Input} placeholder="Enter Store Name" />
                    <Field name="url_slug" label="Store Slug" component={Input} placeholder="Enter Store Slug" />
                </FormWithActionBtns>
        </StoreLayout>
    );
};

const validate = ({ name, url_slug }) => {
    const errors = {};

    if (!name || name === '') errors.name = 'Enter Store Name';
    if (!url_slug || url_slug === '') errors.url_slug = 'Enter Store Slug';

    return errors;
};

export default reduxForm({
    form: 'StoreInfoPage',
    validate,
})(StoreInfoPage);
