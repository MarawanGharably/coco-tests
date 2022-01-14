import React from 'react';
import { Field } from 'redux-form';
import { Form, Row } from 'react-bootstrap';
import { Input, Range } from '../../_formFields';
import styles from './RangeInputSet.module.scss';

export default function RangeInputSet({ input, label, mode = 'inline', min = 0, max = 10, step = 1, meta }) {
	return (
		<Form.Group controlId='rangeInput' className={`${styles.cmp} ${styles[`mode-${mode}`]} `}>
			{label && <Form.Label>{label}</Form.Label>}

			<Row className={`${styles.wrapper}`}>
				<Field name={input.name} component={Range} min={min} max={max} step={step} />
				<Field name={input.name} component={Input} />
			</Row>
		</Form.Group>
	);
}