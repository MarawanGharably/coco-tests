import React from 'react';
import useStepButton from './useStepButton';

const StepButton = (props) => {
    const { currentStep } = useStepButton(props);

    return (
        <button type="submit">{currentStep}</button>
    );
};

export default StepButton;
