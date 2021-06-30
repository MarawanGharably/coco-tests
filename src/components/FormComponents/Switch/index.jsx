import React from 'react';
import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = ({
    name, label, value, disabled, handleChange, className,
}) => (
    <div className={`switch-container ${className}`}>
        <input
            className="switch-input"
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            disabled={disabled}
            onChange={handleChange}
        />
        <label className="switch-label" htmlFor={name}>{label}</label>
    </div>
);

Switch.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

Switch.defaultProps = {
    label: '',
    value: false,
    disabled: false,
    className: '',
};

export default Switch;
