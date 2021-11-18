import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Form, Field, reduxForm} from "redux-form";
import StoreLayout from '../../components/layouts/StoreLayout';
import {ColorSelector, FileInput} from '../../components/ReduxForms/_formFields';


const StoreInfoPage =({handleSubmit}) => {
    const router = useRouter();
    const {id} =router.query;

    const onSubmit=(values)=>{

    }

    return (
    <StoreLayout fluid={'xl'} title="Store Info">
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/*<Field name='primary_color' label='Primary Color:' component={ColorSelector} />*/}
            {/*<Field name='file' label='Primary Color:' component={FileInput} />*/}
        </Form>
    </StoreLayout>
    );
}


const validate=(values)=>{
    const errors = {};
    return errors;
}

export default reduxForm({
    form: 'StoreInfoPage',
    validate,
})(StoreInfoPage);
