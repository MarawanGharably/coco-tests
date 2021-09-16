import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';
import styles from './SubmitButton.module.scss';

const SubmitButton = ({ buttonText = '', submitting, onClick, className='' }) => {
    return (
        <Button type="submit" className={`${styles.submitButton} ${className}`} onClick={onClick} disabled={submitting}>
            <span className="text">{buttonText}</span>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className={`${styles.spinner} ${submitting ? styles.active : styles.hidden}`}
            />
        </Button>
    );
};

SubmitButton.propTypes = {
    buttonText: PropTypes.string,
    extraClass: PropTypes.string,
    submitting: PropTypes.bool,
    onClick: PropTypes.func,
};

SubmitButton.defaultProps = {
    buttonText: 'SUBMIT',
    extraClass: '',
    submitting: false,
    onClick: null,
};

export default SubmitButton;
