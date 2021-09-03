import { SET_USER_DATA } from "../types/user";

const initialState = {};


export default function(state=initialState, action){
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...action.payload
      }
    default:
      return state;

  }
}
