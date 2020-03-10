import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

// formField is required and should match API shape
const TextInput = ({ formField, title, placeholder }) => (
    <Input
        type="text"
        formField={formField}
        labelTitle={title}
        placeholder={placeholder}
    />
);

TextInput.propTypes = {
    formField: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

TextInput.defaultProps = {
    placeholder: '',
};

export default TextInput;
