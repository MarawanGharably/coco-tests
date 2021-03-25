import {
    createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

/**   Reducers  * */
import AuthReducer from './reducers/AuthReducer';

const appReducer = combineReducers({
    form: formReducer,
    session: AuthReducer,
});

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(...enhancers) : compose(...enhancers);

const initializeStore = () => createStore(appReducer, undefined, composedEnhancers);

export default initializeStore;
