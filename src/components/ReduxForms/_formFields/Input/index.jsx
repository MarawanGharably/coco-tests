import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FieldErrorUI from '../../commonUI/FieldErrorUI';
import styles from './Input.module.scss';

/**
 * @param input
 * @param variant {string}  - Styling variant [dark|light]
 * @param type
 * @param label
 * @param placeholder
 * @param disabled
 * @param meta {}
 * @returns {JSX.Element}
 * @constructor
 */
const Input = ({ input = {}, variant = 'dark', type = 'text', label = '', placeholder = '', disabled, meta }) => {
	return (
		<Form.Group
			className={`input-field mb-3 ${styles['input-field']} ${variant ? styles[`${variant}-variant`] : ''}`}
			controlId={input.name}>
			{label && <Form.Label>{label}</Form.Label>}
			<Form.Control
				{...input}
				type={type}
				placeholder={placeholder}
				readOnly={!!disabled}
				autoComplete='off'
				onFocus={(e) => e.target.placeholder = ''}
				onBlur={(e) => e.target.placeholder = placeholder}
			/>

			<FieldErrorUI meta={meta} />
		</Form.Group>
	);
};

Input.defaultProps = {
	type: 'text',
	label: '',
	placeholder: '',
	extraClass: '',
	disabled: false,
};

Input.propTypes = {
	input: PropTypes.InstanceOf(PropTypes.Object).isRequired,
	meta: PropTypes.InstanceOf(PropTypes.Object).isRequired,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	extraClass: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Input;
