import { SET_USER_DATA } from "../types/user";

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})
