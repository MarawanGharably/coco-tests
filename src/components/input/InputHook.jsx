import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import ErrorMessage from './ErrorMessage';

const useInput = (enableValidation, validate = null, inheritedInputFunc = null) => {
    const [text, setText] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);

    const debouncedSetErrors = debounce((value) => {
        const errorList = validate(value);
        setErrors(errorList);
    }, 250);

    const handleUserInput = (e) => {
        e.persist();
        const { value } = e.target;
        if (inheritedInputFunc) {
            inheritedInputFunc(e);
        }
        setText(value);
        if (enableValidation && validate) {
            debouncedSetErrors(value);
        }
    };

    useEffect(() => {
        if (errors.length === 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [errors.length]);

    const renderErrors = () => errors.map(([key, error]) => (
        <ErrorMessage key={key} text={error} />
    ));

    return {
        text,
        isValid,
        renderErrors,
        handleUserInput,
    };
};

export default useInput;
