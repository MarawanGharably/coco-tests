import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

// formField is required and should match API shape
const TextInput = ({
    formField, title, placeholder, value, handleChange,
}) => (
    <Input
        type="text"
        formField={formField}
        labelTitle={title}
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
    />
);

TextInput.propTypes = {
    formField: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
};

TextInput.defaultProps = {
    placeholder: '',
    value: '',
    handleChange: null,
};

export default TextInput;
