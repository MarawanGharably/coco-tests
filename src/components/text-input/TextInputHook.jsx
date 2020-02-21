import { useState } from 'react';

export const useTextHandler = () => {
    const [text, setText] = useState('');

    const handleUserInput = (e) => {
        const { value } = e.target;
        setText(value);
    };

    return [text, handleUserInput];
};
