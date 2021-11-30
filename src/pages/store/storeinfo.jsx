import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components/ReduxForms/_formFields';
import StoreLayout from '../../components/layouts/StoreLayout';
import { getStoreInfo, updateStoreInfo } from '../../APImethods';
import SubmitStatusMessage from '../../components/ReduxForms/SubmitStatusMessage';
import FormWithActionBtns from "../../components/FormComponents/FormWithActionBtns";


let StoreInfoPage = ({ handleSubmit, initialize }) => {
    const router = useRouter();
    const { id: storeId } = router.query;

    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState({});

    useEffect(() => {
        storeId &&
            getStoreInfo(storeId)
                .then((res) => {
                    initialize({
                        name: res?.name || '',
                        url_slug: res?.url_slug || '',
                    });
                })
                .catch((err) => console.log(err));
    }, [storeId]);

    const onSubmit = (values) => {
        setSubmitting(true);

        updateStoreInfo(storeId, values)
            .then((res) => {
                setStatus({ success: true, message: 'Store Info Updated Successfully' });

                setTimeout(() => {
                    router.push(`/store/hotspots/?id=${storeId}`);
                }, 2000);
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || 'Store Info update failed' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const onPageRefresh = () => {
        location.reload();
    };

    return (
        <StoreLayout title="Store Info">
            <SubmitStatusMessage status={status} />

                <FormWithActionBtns handleSubmit={handleSubmit} onSubmit={onSubmit} onPageRefresh={onPageRefresh} submitting={submitting} fieldsWrapperStyle={{ maxWidth: '40em' }}>
                    <Field name="name" label="Store Name" mode="dark" component={Input} placeholder="Enter Store Name" />
                    <Field name="url_slug" label="Store Slug" mode="dark" component={Input} placeholder="Enter Store Slug" />
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
