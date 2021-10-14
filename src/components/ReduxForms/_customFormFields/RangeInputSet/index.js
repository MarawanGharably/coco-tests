import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import { Input, Range } from '../../_formFields';

export default function RangeInputSet({ input, label, min = 0, max = 10, step = 1, meta }) {
    return (
        <Form.Group controlId="rangeInput">
            {label && <Form.Label>{label}</Form.Label>}

            <Row>
                <Col>
                    <Field name={input.name} component={Range} min={min} max={max} step={step} />
                </Col>

                <Col xs={3}>
                    <Field name={input.name} component={Input} />
                </Col>
            </Row>
        </Form.Group>
    );
}
