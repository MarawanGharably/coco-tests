import { Form } from 'react-bootstrap';
import React from 'react';

export default function Checkbox({ input = {}, label = '', className = '', meta: { touched, error, warning } }) {

    const onChange = (e) => {
        const { checked } = e.target;
        input.onChange(checked);
    };

    return (<Form.Check inline className={className}  onChange={onChange} >
        <Form.Check.Input {...input}  checked={input.value} type='checkbox' isValid />
        <Form.Check.Label>{label}</Form.Check.Label>
    </Form.Check>);
}
