import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';
import './SubmitButton.scss';

const SubmitButton = ({ buttonText = '', submitting, onClick, className='' }) => {
    return (
        <Button type="submit" className={`submitButton ${className}`} onClick={onClick}>
            <span className="text">{buttonText}</span>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className={`spinner ${submitting ? 'active' : 'hidden'}`}
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
