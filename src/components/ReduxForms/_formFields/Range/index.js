import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styles from './range.module.scss';

export default function Range({ input, label, variant, min = 0, max = 10, step = 1, meta: { touched, error, warning } }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(input.value);
    }, [input.value]);

    //Update field value ONLY on onMouseUp event call
    const handleScaleChange = () => {
        input.onChange(value); //Update Redux Field state
    };


    return (
        <Form.Group controlId="rangeInput" className={`${styles.cmp} ${variant ? styles[`${variant}-variant`]:''}`}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Range
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onMouseUp={handleScaleChange}
                className={`input-field form-control `}
            />
        </Form.Group>
    );
}
