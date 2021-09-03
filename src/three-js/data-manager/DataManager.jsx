import React, {useEffect, useReducer, useContext} from 'react';
import PropTypes from 'prop-types';
import { apiGetHotspotsByType } from '../../APImethods/HotspotsAPI'; // eslint-disable-line

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
                return ({
                    ...state,
                    roomObjectData: [],
                });
            }
            return ({
                ...state,
                roomObjectData,
            });
        }
        case POST_ROOM_OBJECT_DATA: {
            const { roomObject } = payload;

            return ({
                ...state,
                roomObjectData: [...state.roomObjectData, roomObject],
            });
        }
        case UPDATE_ROOM_OBJECT_DATA: {
            const { roomObject } = payload;
            const updatedRoomObjectData = state.roomObjectData.map((originalRoomObject) => {
                if (originalRoomObject.id === roomObject.id) {
                    return roomObject;
                }
                return originalRoomObject;
            });

            return ({
                state,
                roomObjectData: updatedRoomObjectData,
            });
        }
        case DELETE_ROOM_OBJECT_DATA: {
            const { id } = payload;
            const filteredRoomObjects = state.roomObjectData.filter((roomObject) => {
                if (roomObject.id === id) {
                    return false;
                }
                return true;
            });

            return ({
                state,
                roomObjectData: filteredRoomObjects,
            });
        }
        case ASSIGN_UUID:
            return ({
                state,
            });
        case CLEAR_ROOM_OBJECT_DATA:
            return ({
                ...state,
                roomObjectData: [],
            });
        default:
            console.error(`Action of type ${type} not supported!`);
            return state;
    }
};



export const DataManager = ({
    hotspotTypes, sceneId, storeId, children,
}) => {
    const [state, dispatch] = useReducer(dataManagerReducer, initialState);



    // Whenever sceneId changes, clear old room object data and retrieve existing room objects
    useEffect(() => {
        const clearRoomData = () => {
            dispatch({
                type: CLEAR_ROOM_OBJECT_DATA,
            });
        };

        const getRoomObjectData = async () => {
            if (Array.isArray(hotspotTypes)) {
                const promises = hotspotTypes.map((hotspotType) => (
                    apiGetHotspotsByType(hotspotType, storeId, sceneId)
                ));

                return Promise.all(promises);
            }

            return apiGetHotspotsByType(hotspotTypes, storeId, sceneId);
        };

        const setRoomDataAsync = async () => {
            if (!sceneId) return;

            const response = await getRoomObjectData();
            const roomObjectData = response.flat().filter((object) => (
                typeof object !== 'string'
            ));

            dispatch({
                type: SET_ROOM_OBJECT_DATA,
                payload: { roomObjectData: roomObjectData }, //eslint-disable-line
            });
        };

        clearRoomData();
        setRoomDataAsync();
        // updateColliderTransformByRoom();
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
    hotspotTypes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    sceneId: PropTypes.string.isRequired,
    storeId: PropTypes.string.isRequired,
};
