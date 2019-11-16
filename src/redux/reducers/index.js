import { combineReducers } from 'redux';


const newRouteInput = (state='', action) =>{
    switch (action.type) {
        case 'ROUTE_INPUT':
            return action.payload;
        default:
            return state;
    }
        
}

export default combineReducers({
    newRouteInput,
    // loginMessage,
    // registrationMessage,
  });