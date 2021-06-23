import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import productLibraryReducer from './productLibraryReducer';

const appReducer = combineReducers({
    form: formReducer,
    session: authReducer,
    productLibrary: productLibraryReducer,
});

export default appReducer;