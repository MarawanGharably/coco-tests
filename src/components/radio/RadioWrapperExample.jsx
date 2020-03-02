import React, { useState } from 'react';
import Radio from './Radio';

const MY_OPTIONS = Object.freeze({
    OPTION1: 'Up to 25',
    OPTION2: '25 - 50',
    OPTION3: '50 or more',
});

const RadioWrapperExample = () => {
    const [selectedValue, setSelectedValue] = useState(MY_OPTIONS.OPTION1);

    const radioHandler = (e, value) => {
        setSelectedValue(value);
    };

    const radioKeyboardHandler = (e, value) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            setSelectedValue(value);
        }
    };

    return (
        <div
            role="radiogroup"
            className="radio-group flex"
        >
            <Radio
                radioHandler={radioHandler}
                radioKeyboardHandler={radioKeyboardHandler}
                value={MY_OPTIONS.OPTION1}
                isSelected={MY_OPTIONS.OPTION1 === selectedValue}
                isImage={false}
                isLabelShowing
            />
            <Radio
                radioHandler={radioHandler}
                radioKeyboardHandler={radioKeyboardHandler}
                value={MY_OPTIONS.OPTION2}
                isSelected={MY_OPTIONS.OPTION2 === selectedValue}
                isImage={false}
                isLabelShowing
            />
            <Radio
                radioHandler={radioHandler}
                radioKeyboardHandler={radioKeyboardHandler}
                value={MY_OPTIONS.OPTION3}
                isSelected={MY_OPTIONS.OPTION3 === selectedValue}
                isImage
                isLabelShowing
                imageUrl="https://placedog.net/325/325"
            />
        </div>
    );
};

export default RadioWrapperExample;
