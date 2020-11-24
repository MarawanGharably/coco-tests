import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

// formField is required and should match API shape
const TextInput = ({
    formField, title, placeholder, value, handleChange, focusOnMount,
}) => (
    <Input
        type="text"
        formField={formField}
        labelTitle={title}
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
        focusOnMount={focusOnMount}
    />
);

TextInput.propTypes = {
    formField: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    focusOnMount: PropTypes.bool,
};

TextInput.defaultProps = {
    placeholder: '',
    value: '',
    handleChange: null,
    focusOnMount: false,
};

export default TextInput;
