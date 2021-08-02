import React, { useState, createContext } from 'react';
import styles from './radioGroup.module.scss';
const initialState = {
    radioHandler: null,
    radioKeyboardHandler: null,
    optionSelected: '',
    setOptionSelected: null,
};

export const RadioSelectionContext = createContext(initialState);

const RadioGroup = ({ children }) => {
    const [optionSelected, setOptionSelected] = useState('');

    const radioHandler = (e, value) => {
        setOptionSelected(value);
    };

    const radioKeyboardHandler = (e, value) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            setOptionSelected(value);
        }
    };

    return (
        <RadioSelectionContext.Provider
            value={{
                optionSelected, setOptionSelected, radioHandler, radioKeyboardHandler,
            }}
        >
            <section className={`${styles['radio-group']} d-flex`} >
                {children}
            </section>
        </RadioSelectionContext.Provider>
    );
};

export default RadioGroup;
