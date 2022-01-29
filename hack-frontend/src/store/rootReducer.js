import { combineReducers } from 'redux';


import JWTReducer from './JWTReducer/jwt.reducer.js';


const rootReducer = combineReducers({

auth: JWTReducer,

});

export default rootReducer;