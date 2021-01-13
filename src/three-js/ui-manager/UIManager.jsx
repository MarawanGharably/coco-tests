import React, { useReducer, useContext } from 'react';


const initialState = {
    dynamicUIs: new Map(),
    stateManager: new Map(),
};

const UIState = React.createContext({ initialState });
const UIDispatch = React.createContext();

export const UIManagerEnums = Object.freeze({
    ADD_UI: 'ADD_UI',
    REMOVE_UI: 'REMOVE_UI',
    UPDATE_UI_STATE: 'UPDATE_UI_STATE',
});

const { ADD_UI, REMOVE_UI, UPDATE_UI_STATE } = UIManagerEnums;

const UIManagerReducer = (state, action) => {
    const { dynamicUIs, stateManager } = state;
    const { type, payload } = action;

    // console.log(payload);

    switch (type) {
        case ADD_UI: {
            const { uuid, componentToRender, renderProps } = payload;
            if (dynamicUIs.has(uuid)) {
                console.error(`Dynamic UI with uuid ${uuid} already exist!`); // eslint-disable-line no-console
                return { dynamicUIs };
            }

            const uiData = {
                uuid,
                type: componentToRender,
                props: renderProps,
            };
            dynamicUIs.set(uuid, uiData);
            return (
                {
                    ...state,
                    dynamicUIs,
                });
        }
        case REMOVE_UI: {
            const { uuid } = payload;

            if (!dynamicUIs.has(uuid)) {
                return state;
            }

            const deleted = dynamicUIs.delete(uuid);

            if (!deleted) {
                console.error(`Delete dynamic ui with uuid ${uuid} failed because it doesn't exist or deletion failure`); // eslint-disable-line no-console
                return state;
            }

            return (
                {
                    ...state,
                    dynamicUIs,
                });
        }
        case UPDATE_UI_STATE: {
            const { uuid, uiState } = payload;
            stateManager.set(uuid, { uiState });

            return ({
                ...state,
                stateManager,
            });
        }
        default:
            console.error(`Action of type ${type} not supported!`);
            break;
    }

    return null;
};

export const UIManager = ({ children }) => {
    const [state, dispatch] = useReducer(UIManagerReducer, initialState);
    const { dynamicUIs } = state;

    const dynamicUIValues = dynamicUIs.values();
    const dynamicUIRender = Array.from(dynamicUIValues).map((uiData) => {
        const UIType = uiData.type;
        const UIProps = uiData.props;
        return <UIType key={uiData.uuid} {...UIProps} />; // eslint-disable-line
    });

    return (
        <UIState.Provider value={state}>
            <UIDispatch.Provider value={dispatch}>
                {dynamicUIRender}
                {children}
            </UIDispatch.Provider>
        </UIState.Provider>
    );
};

export const useUIManager = () => {
    const state = useContext(UIState);
    const dispatch = useContext(UIDispatch);
    return [state, dispatch];
};
