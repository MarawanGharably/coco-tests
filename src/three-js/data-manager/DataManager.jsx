import React, {
    useEffect, useReducer, useContext,
} from 'react';

import PropTypes from 'prop-types';

import { apiGetHotspotsByType } from '../../utils/apiUtils';
// import { useHomePageDataStore } from '../../data-store/home-page-data-store/HomePageDataStore';


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

// const updateColliderTransformByRoom = () => {
//     state.roomObjectData.forEach((object) => {
//         const newColliderArray = [];
//         for (let i = 0; i < object.collider_transform.length; i += 1) {
//             if (i !== 15 && object.collider_transform[i] === 1) {
//                 newColliderArray.push(0.5);
//             } else {
//                 newColliderArray.push(object.collider_transform[i]);
//             }
//         }
//         console.log(object);

//         const postData = {
//             id: object.id,
//             type: 'product',
//             scene_id: sceneId,
//             collider_transform: newColliderArray,
//             transform: object.transform,
//             props: {
//                 product_sku: object.sku,
//                 hotspot_type: 'product',
//             },
//         };

//         console.log(postData, storeState);

//         try {
//             const response = apiUpdateHotspotByType(
//                  hotspotType, storeState.selectedStoreId, object.id, postData);
//             console.log(response);
//         } catch (err) {
//             console.error(err);
//         }
//     });
// };

export const DataManager = ({
    hotspotType, sceneId, storeId, children,
}) => {
    const [state, dispatch] = useReducer(dataManagerReducer, initialState);
    // const [storeState] = useHomePageDataStore();


    // Whenever sceneId changes, clear old room object data and retrieve existing room objects
    useEffect(() => {
        const clearRoomData = () => {
            dispatch({
                type: CLEAR_ROOM_OBJECT_DATA,
            });
        };
        const setRoomDataAsync = async () => {
            const roomObjectData = await apiGetHotspotsByType(hotspotType, storeId, sceneId);
            dispatch({
                type: SET_ROOM_OBJECT_DATA,
                payload: { roomObjectData: roomObjectData }, //eslint-disable-line
            });
        };

        clearRoomData();
        setRoomDataAsync();
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
    storeId: PropTypes.string.isRequired,
};
