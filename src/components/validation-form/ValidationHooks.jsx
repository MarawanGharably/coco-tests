import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';

const useValidate = (validate) => {
    const [text, setText] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleUserInput = (e) => {
        e.persist();
        const { value } = e.target;
        const errorList = validate(value);
        setErrors(errorList);
        setText(value);
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

export default useValidate;
