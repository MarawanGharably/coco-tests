import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { getStores, createStorePolicy } from '../../../APImethods';
import { Select } from '../../../components/ReduxForms/_formFields';
import SubmitButton from '../../../components/FormComponents/SubmitButton';
import SubmitStatusMessage from '../../../components/ReduxForms/SubmitStatusMessage';

let NewUserGroupForm = (props) => {
    const {} = useParams();
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

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <h1>Create User Group / Policy</h1>
            <h6 className="text-secondary mb-4">Select a Store To Create a New Policy</h6>
            <SubmitStatusMessage status={status} />
            <Field name="store_id" label="Select Store" component={Select} options={stores} />

            <SubmitButton buttonText="Create" submitting={submitting} className="float-right" />
        </form>
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
