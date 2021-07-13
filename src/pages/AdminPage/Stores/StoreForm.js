import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Input } from '../../../components/ReduxForms/_formFields';
import { Card } from 'react-bootstrap';
import { getStore } from '../../../APImethods/StoreAPI';


let StoreForm = (props) => {
    const { storeId } = useParams();

    useEffect(() => {
        getStore(storeId)
            .then((res) => {
                props.initialize(res);
            })
            .catch((err) => {});
    }, []);

    const handleSubmit = (values) => {};

    return (
        <>
            <h1>Edit Store</h1>
            <form onSubmit={handleSubmit(handleSubmit)} style={{ width: '100%' }}>
                <Card className='my-4'>
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                        <Field name="name" label="Name" component={Input} disabled />
                        <Field name="status" label="status" component={Input} disabled />
                    </Card.Body>
                </Card>
            </form>
        </>
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

const mapStateToProps = (state) =>({
    formValues: getFormValues('StoreForm')(state)
});

export default connect(mapStateToProps, {})(StoreForm);
