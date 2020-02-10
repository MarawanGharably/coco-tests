import { exampleActions } from './ExampleActions';

const { SET_EXAMPLE_STATE_TRUE, SET_EXAMPLE_STATE_FALSE, UPDATE_ID } = exampleActions;

const simpleExampleReducer = (state, action) => {
    switch (action.type) {
        case SET_EXAMPLE_STATE_TRUE: {
            return { example: true };
        }
        case SET_EXAMPLE_STATE_FALSE: {
            return { example: false };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const slightlyMoreComplicatedReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_ID: {
            // can also destructure here
            // return {...state, state.id}
            return { ...state, id: state.id };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export { simpleExampleReducer, slightlyMoreComplicatedReducer };
