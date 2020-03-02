import React, { useState, createContext } from 'react';

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
            <section className="radio-group flex">
                {children}
            </section>
        </RadioSelectionContext.Provider>
    );
};

export default RadioGroup;
