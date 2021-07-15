import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Card } from 'react-bootstrap';
import { Input, Checkbox } from '../../../components/ReduxForms/_formFields';
import SubmitButton from '../../../components/FormComponents/SubmitButton';
import SubmitStatusMessage from '../../../components/ReduxForms/SubmitStatusMessage';

// API Methods
import { getStore, updateStore } from '../../../APImethods/StoreAPI';

let StoreForm = (props) => {
    const { storeId } = useParams();
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        getStore(storeId)
            .then((res) => {
                props.initialize(res);
            })
            .catch((err) => {});
    }, []);

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
        <form onSubmit={props.handleSubmit(onSubmit)} >
            <h1>Edit Store</h1>
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
    );
};

const validate = (values) => {
    const errors = {};
    // if (!values.abc ) errors.abc = 'abc cannot be empty';
    return errors;
};

StoreForm = reduxForm({
    form: 'StoreForm',
    validate,
})(StoreForm);

const mapStateToProps = (state) => ({
    formValues: getFormValues('StoreForm')(state),
});

export default connect(mapStateToProps, {})(StoreForm);
