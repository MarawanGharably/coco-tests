import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default function Range({ input, label, min = 0, max = 10, step = 1, meta: { touched, error, warning } }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(input.value);
    }, [input.value]);

    //Update field value ONLY on onMouseUp event call
    const handleScaleChange = () => {
        input.onChange(value); //Update Redux Field state
    };

    return (
        <Form.Group controlId="rangeInput">
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Range
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onMouseUp={handleScaleChange}
                className="input-field form-control"
                style={{ backgroundColor: '#fefefe', padding: '0.9em 0.6em' }}
            />
        </Form.Group>
    );
}
