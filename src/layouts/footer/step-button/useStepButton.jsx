import { useState, useEffect } from 'react';

const useStepButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => setShowButton(true), []);

    return { showButton };
};

export default useStepButton;
