import React from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Input,
    Label,
} from './styles';

const Switch = ({
    name, label, value, disabled, handleChange, className,
}) => (
    <Container className={className}>
        <Input
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            disabled={disabled}
            onChange={handleChange}
        />
        <Label htmlFor={name}>{label}</Label>
    </Container>
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
