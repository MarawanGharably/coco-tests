import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

/**  Reducers **/
import authReducer from "./reducers/authReducer";
import productLibraryReducer from "./reducers/productLibraryReducer";
import HomePageReducer from "./reducers/HomePageReducer";
import SceneEditorReducer from "./reducers/SceneEditorReducer";
import ToastMessagesReducer from './reducers/ToastMessagesReducer';


const appReducer = combineReducers({
    form: formReducer,
    session: authReducer,
    productLibrary: productLibraryReducer,
    HomePageStore: HomePageReducer,
    SceneEditor: SceneEditorReducer,
    toastMessages: ToastMessagesReducer,
});


const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(...enhancers) : compose(...enhancers);


export const wrapper = createWrapper(makeStore);


export default function makeStore(){
    return createStore(appReducer, undefined, composedEnhancers);
};



