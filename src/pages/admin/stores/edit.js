import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { Field, reduxForm } from 'redux-form';
import { Card } from 'react-bootstrap';
import { Input, Checkbox } from '../../../components/ReduxForms/_formFields';
import SubmitButton from '../../../components/FormComponents/SubmitButton';
import SubmitStatusMessage from '../../../components/ReduxForms/SubmitStatusMessage';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';

// API Methods
import { getStore, updateStore } from "../../../APImethods";

let StoreForm = (props) => {
    const { id:storeId } = props.router.query;
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        getStore(storeId)
            .then((res) => {
                props.initialize(res);
            })
            .catch((err) => {});
    }, [storeId]);

    const onSubmit = (values) => {
        setSubmitting(true);
        updateStore(storeId, values)
            .then((res) => {
                setStatus({ success: true, message: 'Store Updated Successfully' });
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || 'Error' });
            })
            .finally(() => {
                setSubmitting(false);
                setTimeout(() => {
                    setStatus(false);
                }, 10000);
            });
    };

    return (
        <AdminPageLayout title='Edit Store'>
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <SubmitStatusMessage status={status} />

                <Card className="my-4">
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                        <Field name="name" label="Name" component={Input} disabled />
                        <Field name="status" label="status" component={Input} disabled />
                    </Card.Body>
                </Card>

                <Card className="my-4">
                    <Card.Header>Product Library</Card.Header>
                    <Card.Body>
                        <Field name="product_library_enabled" label="Products Library Enabled" component={Checkbox} />
                    </Card.Body>
                </Card>

                <SubmitButton buttonText="Save" submitting={submitting} className="align-self-end" />
            </form>
        </AdminPageLayout>
    );
};

const validate = (values) => {
    const errors = {};
    // if (!values.abc ) errors.abc = 'abc cannot be empty';
    return errors;
};

export default reduxForm({
    form: 'StoreForm',
    validate,
})(withRouter(StoreForm));
