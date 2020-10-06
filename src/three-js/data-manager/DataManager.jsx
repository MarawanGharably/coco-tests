import React, {
    useEffect, useReducer, useContext,
} from 'react';

import PropTypes from 'prop-types';

import { apiGetHotspotsByType, apiCreateHotspotByType } from '../../utils/apiUtils';


const initialState = {
    loading: false,
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
    ASSIGN_UUID: 'ASSIGN_UUID',
};

const {
    SET_ROOM_OBJECT_DATA, POST_ROOM_OBJECT_DATA, UPDATE_ROOM_OBJECT_DATA, DELETE_ROOM_OBJECT_DATA, CLEAR_ROOM_OBJECT_DATA, ASSIGN_UUID, //eslint-disable-line
} = DATA_MANAGER_ENUMS;

const dataManagerReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ROOM_OBJECT_DATA: {
            const { roomObjectData } = payload;

            if (typeof roomObjectData === 'string') {
                return state;
            }
            return ({
                ...state,
                roomObjectData,
            });
        }
        case POST_ROOM_OBJECT_DATA: {
            const {
                hotspotType, sceneId, transform, colliderTransform, sku,
            } = payload;

            const postData = {
                type: hotspotType,
                scene_id: sceneId,
                collider_transform: colliderTransform.elements,
                transform: transform.elements,
                props: {
                    product_sku: sku,
                    hotspot_type: 'product',
                },
            };
            apiCreateHotspotByType(hotspotType, postData);
            return ({
                ...state,
                roomObjectData: [...state.roomObjectData, postData],
            });
        }
        case ASSIGN_UUID:
            return ({
                state,
            });
        default:
            console.error(`Action of type ${type} not supported!`);
            return state;
    }
};

export const DataManager = ({ hotspotType, sceneId, children }) => {
    const [state, dispatch] = useReducer(dataManagerReducer, initialState);
    // Whenever sceneId changes, clear old room object data and retrieve existing room objects
    useEffect(() => {
        const fetchData = async () => {
            const roomObjectData = await apiGetHotspotsByType(hotspotType, sceneId);
            dispatch({
                type: SET_ROOM_OBJECT_DATA,
                payload: { roomObjectData: roomObjectData }, //eslint-disable-line
            });
        };
        fetchData();
    }, [sceneId]); // eslint-disable-line

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
