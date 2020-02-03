import React from "react";
import { ExampleContextProvider, useExampleState, useExampleDispatch } from "./ExampleContextProvider.jsx";

const SomethingReliantOnContext = () => {
    const { example } = useExampleState();
    const dispatch = useExampleDispatch();

    const onClickHandler = () => {
        if (example) {
            dispatch({ type: "SET_EXAMPLE_STATE_FALSE" });
            return;
        }
        dispatch({ type: "SET_EXAMPLE_STATE_TRUE" });
    };
    const className = example ? "example-button-true" : "example-button-false";
    return (
        <button className={`example-button ${className} flex flex-center`} type="button" onClick={onClickHandler}>
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
