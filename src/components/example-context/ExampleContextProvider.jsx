import React, { useReducer } from 'react';
import ExampleStateContext from './ExampleStateContext.jsx';
import ExampleDispatchContext from './ExampleDispatchContext.jsx';

const initialState = {
    example: false
}

const simpleExampleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXAMPLE_STATE_TRUE': {
            return {example: true};
        }
        case 'SET_EXAMPLE_STATE_FALSE': {
            return {example: false};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const slightlyMoreComplicatedReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_ID': {
            // can also destructure here
            // return {...state, state.id}
            return Object.assign({}, state, {
                id: state.id
            })
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const useExampleState = () => {
    const context = React.useContext(ExampleStateContext);
    if (context === undefined) {
        throw new Error('useExampleState must be used within an ExampleContextProvider')
    }
    return context;
}

const useExampleDispatch = () => {
    const context = React.useContext(ExampleDispatchContext);
    if (context === undefined) {
        throw new Error('useExampleDispatch must be used within an ExampleContextProvider')
    }
    return context;
}

const ExampleContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(simpleExampleReducer, initialState);

    return (
        <ExampleStateContext.Provider value={state}>
            <ExampleDispatchContext.Provider value={dispatch}>
                {children}
            </ExampleDispatchContext.Provider>
        </ExampleStateContext.Provider>
    )
}

export { ExampleContextProvider, useExampleState, useExampleDispatch };