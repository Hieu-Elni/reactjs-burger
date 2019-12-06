import { combineReducers } from 'redux';

import ingReducer from './burger';
import ordersReducer from './ordersReducer';
import authReducer from './authReducer';
const appReducers = combineReducers({
    ingReducer,
    ordersReducer,
    authReducer
});

export default appReducers;