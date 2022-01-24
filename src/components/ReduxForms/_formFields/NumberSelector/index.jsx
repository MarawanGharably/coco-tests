import { Form } from 'react-bootstrap';
import React from 'react';
import styles from './NumberSelector.module.scss';

export default function NumberSelector({
	input,
	label = '',
	mode,
	min,
	max,
	meta: { touched, error, warning }
}) {
	return (
		<Form.Group controlId="numberSelector" className={`${styles.cmp} ${mode ? styles[`${mode}-mode`] : ''}`}>
			<Form.Label>{label}</Form.Label>
			<Form.Control {...input} type="number" min={min} max={max}/>

			{touched && (error || warning) && (
                <ul className="form-field-error">
                    {error && <li className="field-error">{error}</li>}
                    {warning && <li className="field-warn">{warning}</li>}
                </ul>
            )}
		</Form.Group>
	);
}
