import React from "react";
import { Form } from "redux-form";
import PropTypes from 'prop-types';
import { Spinner } from "react-bootstrap";
import FormActions from "../FormActions";
import styles from "./formWithActionBtns.module.scss";


const FormWithActionBtns=({ dataLoaded, handleSubmit, onSubmit, submitting, reset, pristine, fieldsWrapperStyle = {}, children })=> {
    if (dataLoaded) {
        return (
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.cmp} >
                <div className={styles.fieldsWrapper} style={fieldsWrapperStyle}>
                    {children}
                </div>

                <FormActions onPageRefresh={reset} submitting={submitting} pristine={pristine}/>
            </Form>
        );
    } else {
        return <Spinner animation="border" role="status" variant="info" style={{ display: "flex", alignSelf: "center", marginTop: "10em" }} />;
    }
}

FormWithActionBtns.propTypes={
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    reset: PropTypes.bool.isRequired,
}

export default FormWithActionBtns;