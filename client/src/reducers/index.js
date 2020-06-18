import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import songsReducer from './songsReducer';
import songReducer from './songReducer';


export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    songs: songsReducer,
    song: songReducer,
});