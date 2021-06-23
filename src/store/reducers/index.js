import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import productLibraryReducer from './productLibraryReducer';
import HomePageReducer from './HomePageReducer';

const appReducer = combineReducers({
    form: formReducer,
    session: authReducer,
    productLibrary: productLibraryReducer,
    HomePageStore: HomePageReducer,
});

export default appReducer;