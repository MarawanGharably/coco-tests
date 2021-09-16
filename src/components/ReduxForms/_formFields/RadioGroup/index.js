import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import styles from './radioGroup.module.scss';

export default function RadioGroup({ input = {}, label = '', options = [], inline = false, className = '', meta: { touched, error, warning } }) {
    return (
        <div className={`${styles['radio-group']} ${className}`}>
            {options.map((item, i) => {
                return (
                    <Form.Check
                        {...input}
                        key={i}
                        type="radio"
                        inline={inline}
                        id={`default-radio-${i}`}
                        label={item.label}
                        value={item.value}
                        onChange={(e) => input.onChange(e.target.value)}
                    />
                );
            })}
        </div>
    );
}
