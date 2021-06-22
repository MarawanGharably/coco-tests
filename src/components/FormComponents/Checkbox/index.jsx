import React from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Input,
    Label,
} from './styles';

const Checkbox = ({
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

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

Checkbox.defaultProps = {
    label: '',
    value: false,
    disabled: false,
    className: '',
};

export default Checkbox;
