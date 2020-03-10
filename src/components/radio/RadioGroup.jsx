import React, { useState, createContext } from 'react';
import { useFormDataStore, SET_FORM_DATA } from '../../data-store/form-data-store/FormDataStore';

const initialState = {
    radioHandler: null,
    radioKeyboardHandler: null,
    optionSelected: '',
    setOptionSelected: null,
};

export const RadioSelectionContext = createContext(initialState);

const RadioGroup = ({ children }) => {
    const [optionSelected, setOptionSelected] = useState('');
    const [, formDataDispatch] = useFormDataStore();

    const radioHandler = (e, value, formField) => {
        setOptionSelected(value);
        const action = {
            type: SET_FORM_DATA,
            payload: { [formField]: value },
        };
        formDataDispatch(action);
    };

    const radioKeyboardHandler = (e, value, formField) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            setOptionSelected(value);
            const action = {
                type: SET_FORM_DATA,
                payload: { [formField]: value },
            };
            formDataDispatch(action);
        }
    };

    return (
        <RadioSelectionContext.Provider
            value={{
                optionSelected, setOptionSelected, radioHandler, radioKeyboardHandler,
            }}
        >
            <section className="radio-group flex">
                {children}
            </section>
        </RadioSelectionContext.Provider>
    );
};

export default RadioGroup;
