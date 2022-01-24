import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import Input from '../Input';
import styles from './colorSelector.module.scss';

export default function ColorSelector({
	input,
	label = 'Select Color',
	defaultValue = '#8b5bd2',
	placeholder = '',
	mode,
}) {
	return (
		<Form.Group className={styles['cmp']}>
			{label && <Form.Label>{label}</Form.Label>}
			<Row>
				<Col style={{ paddingRight: '0px' }}>
					<Field
						name={input.name}
						component={Input}
						extraClass={styles['colorSelector']}
						placeholder={placeholder}
						mode={mode}
					/>
				</Col>
				<Col
					className="col-lg-auto col-md-auto col-sm-auto"
					style={{ paddingLeft: '6px' }}
				>
					<ColorPicker input={input} defaultValue={defaultValue} />
				</Col>
			</Row>
		</Form.Group>
	);
}

const ColorPicker = ({ input, defaultValue }) => {
	const color = input.value || defaultValue;

	return (
		<div className={styles['cp_wrapper']}>
			<Form.Control
				{...input}
				type="color"
				id="exampleColorInput"
				className={styles['colorBox']}
				value={color}
				title="Choose your color"
			/>
			<div
				className={styles['colorSelectorPreview']}
				style={{ backgroundColor: color }}
			/>
		</div>
	);
};
