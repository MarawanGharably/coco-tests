import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

const TextInput = ({
    id, title, placeholder,
}) => (
    <Input
        type="text"
        labelTitle={title}
        placeholder={placeholder}
        labelId={id}
    />
);

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

TextInput.defaultProps = {
    placeholder: '',
};

export default TextInput;
