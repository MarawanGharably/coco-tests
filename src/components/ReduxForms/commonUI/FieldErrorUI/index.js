import React from 'react';
import PropTypes from 'prop-types';
import styles from './fieldError.module.scss';

const FieldErrorUI = ({ meta }) => {
	const { touched, error, warning } = meta;
	if(!touched || (!error && !warning)) return false;

	return (<div className={styles.cmp}>
		{error && <div className={styles['error']}>{error}</div>}
		{warning && <div className={styles['warn']}>{warning}</div>}
	</div>);
};

FieldErrorUI.propTypes = {
	meta: PropTypes.InstanceOf(PropTypes.Object).isRequired,
};

export default FieldErrorUI;