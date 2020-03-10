import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import ErrorMessage from './ErrorMessage';
import { useFormDataStore, SET_FORM_DATA } from '../../data-store/form-data-store/FormDataStore';

const useInput = (validate, formField) => {
    const [text, setText] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);
    const [, formDataDispatch] = useFormDataStore();

    const debouncedSetErrors = debounce((value) => {
        const errorList = validate(value);
        setErrors(errorList);
    }, 250);

    const debouncedFormDataDispatch = debounce((value) => {
        const action = {
            type: SET_FORM_DATA,
            payload: { [formField]: value },
        };
        formDataDispatch(action);
    }, 250);

    const handleUserInput = (e) => {
        e.persist();
        const { value } = e.target;
        setText(value);
        debouncedFormDataDispatch(value);
        if (validate) {
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
