import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Card, Alert } from 'react-bootstrap';
import { Input, Select } from '../../../components/ReduxForms/_formFields';
import Layout from "../../../layouts/Layout";
import {SubmitButton} from "../../../components/FormComponents";
import { createUser, getPolicies  } from '../../../APImethods';


let NewUserForm = ({mode, handleSubmit}) => {
    const [submitting, setSubmitting] = useState(false);
    const [policies, setPolicies] = useState([]);
    const [status, setStatus] = useState();
    const history  = useHistory();


    useEffect(() => {
        getPolicies().then(res=>{
            setPolicies(res.map((option) => ({
                label: option.name,
                value: option.access_policy,
            })));
        }).catch();
    }, []);



    const onSubmit = (values) => {
        setSubmitting(true);
        createUser(values)
            .then(res=>{
                setStatus({type:'success', msg:'Success'});
                setTimeout(() => {
                    history.push('/admin/users');
                }, 3000);
            })
            .catch(err=>{
                setStatus({type:'error', msg:'Erorr'});
            })
            .finally(()=>{
                setSubmitting(false);
            });
    };


    return (
        <Layout title='Create User' subTitle=''>
            {status?.type=='success' && (<Alert variant='success'>{status.msg}</Alert>)}
            {status?.type=='error' && (<Alert variant='danger'>{status.msg}</Alert>)}

            <form onSubmit={handleSubmit(onSubmit)} >
                <Card className='my-4'>
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                        <Field name="given_name" label="User Name" component={Input}  />
                        <Field name="email" label="email" type="email" component={Input}  />
                    </Card.Body>
                </Card>

                <Card className='my-4'>
                    <Card.Header>Access Policies</Card.Header>
                    <Card.Body>
                        <Field name="policies" label="policies" placeholder="Select Store Policies" options={policies} component={Select} />
                    </Card.Body>
                </Card>

                <SubmitButton buttonText='Create' submitting={submitting} className='float-right'/>
            </form>
        </Layout>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.given_name ) errors.given_name = 'User Name cannot be empty';
    if (!values.email ) errors.email = 'Email cannot be empty';
    return errors;
};

NewUserForm = reduxForm({
    form: 'NewUserForm',
    validate,
})(NewUserForm);

const mapStateToProps = (state) =>({
    formValues: getFormValues('NewUserForm')(state)
});

export default connect(mapStateToProps, {})(NewUserForm);
