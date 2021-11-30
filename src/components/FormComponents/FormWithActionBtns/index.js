import React from 'react';
import { Form } from 'redux-form';
import FormActions from '../FormActions';
import styles from './formWithActionBtns.module.scss';

export default function FormWithActionBtns({ handleSubmit, onSubmit, submitting, onPageRefresh, fieldsWrapperStyle = {}, children }) {
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.cmp}>
            <div className={styles.fieldsWrapper} style={fieldsWrapperStyle}>
                {children}
            </div>
            <FormActions onPageRefresh={onPageRefresh} submitting={submitting} />
        </Form>
    );
}
