import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Select } from '../../../components/ReduxForms/_formFields';
import SubmitButton from '../../../components/FormComponents/SubmitButton';
import SubmitStatusMessage from '../../../components/ReduxForms/SubmitStatusMessage';
import AdminPageLayout from "../../../components/layouts/AdminPageLayout";
import { getStores, createStorePolicy } from '../../../APImethods';

let NewUserGroupForm = (props) => {
    const [stores, setStores] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        getStores().then((response) => {
            setStores(
                response.map((option) => ({
                    label: option.name,
                    value: option._id.$oid,
                }))
            );
        });
    }, []);

    const onSubmit = (values) => {
        createStorePolicy(values)
            .then(() => {
                setStatus({ success: true, message: 'Updated Successfully' });
            })
            .catch((err) => {
                setStatus({ error: true, message: err?.message || 'Error' });
            })
            .finally(() => setSubmitting(false));
    };

    return (<AdminPageLayout title='Create User Group / Policy'>
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <h6 className="text-secondary mb-4">Select a Store To Create a New Policy</h6>
            <SubmitStatusMessage status={status} />
            <Field name="store_id" label="Select Store" component={Select} options={stores} />

            <SubmitButton buttonText="Create" submitting={submitting} className="float-right my-4" />
        </form>
        </AdminPageLayout>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.store_id) errors.store_id = 'store_id cannot be empty';
    return errors;
};

export default reduxForm({
    form: 'NewUserGroupForm',
    validate,
})(NewUserGroupForm);
