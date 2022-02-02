import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Form, Row } from 'react-bootstrap';
import { Input, Range } from '../../_formFields';
import styles from './RangeInputSet.module.scss';

/**
 * @param input
 * @param label
 * @param dMode {string} - Display type [inline|rows]
 * @param variant {string}  - Display style [dark|ObsessColors]
 * @param min
 * @param max
 * @param step
 * @returns {JSX.Element}
 */
const RangeInputSet = ({ input, label, dMode, variant='dark', inputVariant, rangeVariant, min = 0, max = 10, step = 1 }) => {
	return (
		<Form.Group controlId='rangeInput' className={`${styles.cmp} ${styles[`dMode-${dMode}`]}  ${variant ? styles[variant+`-variant`]:''}`}>
			{label && <Form.Label>{label}</Form.Label>}

			<Row className={`${styles.wrapper}`}>
				<Field name={input.name} component={Range} min={min} max={max} step={step} variant={rangeVariant || variant} />
				<Field name={input.name} component={Input} variant={inputVariant || variant} />
			</Row>
		</Form.Group>
	);
};

RangeInputSet.propTypes = {
	input: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

export default RangeInputSet;