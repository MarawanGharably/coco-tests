import React, {
    useEffect, useReducer, useContext,
} from 'react';

import PropTypes from 'prop-types';

import { apiGetHotspotsByType } from '../../utils/apiUtils';


const initialState = {
    roomObjectData: [],
};

const dataState = React.createContext(initialState);
const dataDispatch = React.createContext();

export const DATA_MANAGER_ENUMS = {
    SET_ROOM_OBJECT_DATA: 'SET_ROOM_OBJECT_DATA',
    POST_ROOM_OBJECT_DATA: 'POST_ROOM_OBJECT_DATA',
    UPDATE_ROOM_OBJECT_DATA: 'UPDATE_ROOM_OBJECT_DATA',
    DELETE_ROOM_OBJECT_DATA: 'DELETE_ROOM_OBJECT_DATA',
    CLEAR_ROOM_OBJECT_DATA: 'CLEAR_ROOM_OBJECT_DATA',
};

const {
    GET_ROOM_OBJECT_DATA, POST_ROOM_OBJECT_DATA, UPDATE_ROOM_OBJECT_DATA, DELETE_ROOM_OBJECT_DATA, CLEAR_ROOM_OBJECT_DATA, //eslint-disable-line
} = DATA_MANAGER_ENUMS;

const dataManagerReducer = async (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ROOM_OBJECT_DATA: {
            const { hotspotType, sceneId } = payload;
            const roomObjectData = await apiGetHotspotsByType(hotspotType, sceneId);

            return ({
                ...state,
                roomObjectData,
            });
        }
        default:
            console.error(`Action of type ${type} not supported!`);
            return state;
    }
};

export const DataManager = ({ hotspotType, sceneId, children }) => {
    const [state, dispatch] = useReducer(dataManagerReducer, initialState);

    // Whenever sceneId changes, clear old room object data and retrieve existing room objects
    useEffect(() => {
        dispatch({
            type: GET_ROOM_OBJECT_DATA,
            payload: { hotspotType, sceneId },
        });
    }, [hotspotType, sceneId]);

    return (
        <dataState.Provider value={state}>
            <dataDispatch.Provider value={dispatch}>
                {children}
            </dataDispatch.Provider>
        </dataState.Provider>
    );
};

export const useDataManager = () => {
    const state = useContext(dataState);
    const dispatch = useContext(dataDispatch);
    return [state, dispatch];
};

DataManager.propTypes = {
    hotspotType: PropTypes.string.isRequired,
    sceneId: PropTypes.string.isRequired,
};
