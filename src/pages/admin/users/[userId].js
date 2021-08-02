import React, { useEffect, useState } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { withRouter } from 'next/router'
import { Card } from 'react-bootstrap';
import { Input, Select } from '../../../components/ReduxForms/_formFields';
import AdminPageLayout from "../../../components/layouts/AdminPageLayout";
import {SubmitButton} from "../../../components/FormComponents";
import SubmitStatusMessage from "../../../components/ReduxForms/SubmitStatusMessage";

//API methods
import {getUser, updateUser, getPolicies, getUserAccessGroupsWithData} from '../../../APImethods';

let UserForm = (props) => {
    const { userId } = props.router.query;
    const [policies, setPolicies] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState();

    useEffect(() => {
        if(userId){
            //1. Fetch User Data
            getUser(userId).then((res) => {
                props.initialize(res); //Initialize form Data
            });

            //2. Fetch User Groups and associated stores
            getUserAccessGroupsWithData(userId).then((res) => {
                const values = res?.map((item) => item['access_policy']);
                props.change('policies', values); //Update form Data
            });

            //3. Get ALL user-groups/Policies
            getPolicies().then((res) => {
                setPolicies( res.map((option) => ({
                    label: option.name,
                    value: option.access_policy,
                })));
            });
        }
    }, [userId]);

    const onSubmit = (values) => {
        setSubmitting(true);
        updateUser(userId, values)
            .then(res=>{
                setStatus({ success: true, message: 'Updated Successfully' });
            }).catch(err=>{
            setStatus({ error: true, message: err?.message || 'Error' });
        }).finally(()=>{
            setSubmitting(false);
            setTimeout(() => {
                setStatus(false);
            }, 5000);
        });
    };


    return (<AdminPageLayout title='User'>
            <form onSubmit={props.handleSubmit(onSubmit)}>

                <SubmitStatusMessage status={status} />

                <Card className="my-4">
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                        <Field name="given_name" label="User Name" component={Input} disabled />
                        <Field name="email" label="email" type="email" component={Input} disabled />
                        <Field name="UserStatus" label="UserStatus" component={Input} disabled />
                    </Card.Body>
                </Card>

                <Card className="my-4">
                    <Card.Header>Access Policies</Card.Header>
                    <Card.Body>
                        <Field
                            name="policies"
                            label="policies"
                            isMulti={true}
                            placeholder="Select Store Policies"
                            options={policies}
                            component={Select}
                        />
                    </Card.Body>
                </Card>

                <SubmitButton buttonText="Update" submitting={submitting} className="float-right" />
            </form>
        </AdminPageLayout>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.Username ) errors.Username = 'Username cannot be empty';
    // if (!values.email ) errors.email = 'Email cannot be empty';
    return errors;
};

export default reduxForm({
    form: 'UserForm',
    validate,
})(withRouter(UserForm));
