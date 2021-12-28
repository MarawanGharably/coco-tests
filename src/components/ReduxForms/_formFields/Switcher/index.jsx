import React from "react";
import { Form } from "react-bootstrap";
import styles from "./Switcher.module.scss";

const Switcher = ({ input, label = "" }) => {
    return (
        <Form.Group className={`formField ${styles.cmp}`}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Check {...input} checked={input.value} type="switch" id="custom-switch"/>
        </Form.Group>
    );
};

export default Switcher;
