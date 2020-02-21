import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import { useTextHandler } from './TextInputHook';

const TextInput = ({
    id, title, placeholder,
}) => {
    const [text, handleUserInput] = useTextHandler();

    return (
        <Input
            type="text"
            labelTitle={title}
            placeholder={placeholder}
            labelId={id}
            value={text}
            handleChange={handleUserInput}
        />
    );
};

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

TextInput.defaultProps = {
    placeholder: '',
};

export default TextInput;
