import { Form } from 'react-bootstrap';
import React from 'react';

export default function NumberSelector({ input, label = '', meta: { touched, error, warning } }) {
    return (
        <Form.Group controlId="formGroupNumberSelector">
            <Form.Label>{label}</Form.Label>
            <Form.Control {...input} type="number" />
        </Form.Group>
    );
}