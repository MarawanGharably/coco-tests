import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Card } from 'react-bootstrap';
import { getUser } from '../../../APImethods/UsersAPI';
import { Input } from '../../../components/ReduxForms/_formFields';

let UserForm = (props) => {
    const { userId } = useParams();

    useEffect(() => {
        getUser(userId)
            .then((res) => {
                props.initialize(res);
            })
            .catch((err) => {});
    }, []);

    const handleSubmit = (values) => {};

    return (
        <div>
            <h1>User</h1>
            <form onSubmit={handleSubmit(handleSubmit)} style={{ width: '100%' }}>
                <Card className='my-4'>
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                        <Field name="given_name" label="User Name" component={Input} disabled />
                        <Field name="email" label="email" type="email" component={Input} disabled />
                        <Field name="UserStatus" label="UserStatus" component={Input} disabled />
                    </Card.Body>
                </Card>
            </form>
        </div>
    );
};

const validate = (values) => {
    const errors = {};
    // if (!values.password ) errors.password = 'Password cannot be empty';
    return errors;
};

UserForm = reduxForm({
    form: 'UserForm',
    validate,
})(UserForm);

const mapStateToProps = (state) =>({
    formValues: getFormValues('UserForm')(state)
});

export default connect(mapStateToProps, {})(UserForm);
