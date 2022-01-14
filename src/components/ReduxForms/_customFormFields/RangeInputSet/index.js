import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Form, Row } from 'react-bootstrap';
import { Input, Range } from '../../_formFields';
import styles from './RangeInputSet.module.scss';

/**
 * @param input
 * @param label
 * @param mode {string}  [inline|rows]
 * @param min
 * @param max
 * @param step
 * @param meta
 * @returns {JSX.Element}
 */
const RangeInputSet = ({ input, label, mode = 'inline', min = 0, max = 10, step = 1, meta }) => {
	return (
		<Form.Group controlId='rangeInput' className={`${styles.cmp} ${styles[`mode-${mode}`]} `}>
			{label && <Form.Label>{label}</Form.Label>}

			<Row className={`${styles.wrapper}`}>
				<Field name={input.name} component={Range} min={min} max={max} step={step} />
				<Field name={input.name} component={Input} />
			</Row>
		</Form.Group>
	);
};

RangeInputSet.propTypes = {
	input: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

export default RangeInputSet;