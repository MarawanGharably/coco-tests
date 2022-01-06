import React from "react";
import { Form } from "redux-form";
import PropTypes from 'prop-types';
import { Spinner } from "react-bootstrap";
import FormActions from "../FormActions";
import styles from "./formWithActionBtns.module.scss";


const FormWithActionBtns=({ dataLoaded, onSubmit, submitting, onPageRefresh, fieldsWrapperStyle = {}, children })=> {
    if (dataLoaded) {
        return (
            <Form onSubmit={onSubmit} className={styles.cmp} >
                <div className={styles.fieldsWrapper} style={fieldsWrapperStyle}>
                    {children}
                </div>
                <FormActions onPageRefresh={onPageRefresh} submitting={submitting} />
            </Form>
        );
    } else {
        return <Spinner animation="border" role="status" variant="info" style={{ display: "flex", alignSelf: "center", marginTop: "10em" }} />;
    }
}

FormWithActionBtns.propTypes={
    onSubmit: PropTypes.func.isRequired,
    onPageRefresh: PropTypes.func.isRequired,
}

export default FormWithActionBtns;