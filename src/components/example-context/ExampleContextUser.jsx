import React from 'react';
import { ExampleContextProvider, useExampleState, useExampleDispatch } from './ExampleContextProvider.jsx';

const SomethingReliantOnContext = () => {
    const { example } = useExampleState();
    const dispatch = useExampleDispatch();

    const onClickHandler = () => {
        if (example) {
            dispatch({ type: 'SET_EXAMPLE_STATE_FALSE' });
            return;
        }
        dispatch({ type: 'SET_EXAMPLE_STATE_TRUE' });
    };

    return (
        <button type="button" onClick={onClickHandler}>
            <div>{`${example}`}</div>
        </button>
    );
};

const ExampleContextUser = () => (
    <ExampleContextProvider>
        <SomethingReliantOnContext />
    </ExampleContextProvider>
);

export default ExampleContextUser;
