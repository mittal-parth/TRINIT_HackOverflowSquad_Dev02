import {LOGIN, LOGOUT} from "./jwt.types.js"
import ls from "local-storage"


const INITIAL_STATE = {
  token: ls('token'),
  loggedIn: ls('loggedIn'),
  user: ls('user'),
};

const reducer = (state = INITIAL_STATE, action) => {
 
  switch (action.type) {
      case LOGIN:
        ls('token', action.payload.token);
        ls('loggedIn', true);
        ls('user', action.payload.user);
         return {
           token: action.payload.token,
           loggedIn: true,
           user: action.payload.user
         };

      case LOGOUT:
        ls('token', -1);
        ls('loggedIn', false);
        ls('user', null);
         return {
          token: -1,
          loggedIn: false,
          user: null
         };

       default: return state;

  }

};

export default reducer;