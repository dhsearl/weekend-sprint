import { combineReducers } from 'redux';


const turnIntoRoute = (inputString) =>{
    return inputString.replace(/\W+/g, '-').toLowerCase();
}
const newRouteInput = (state='', action) =>{
    switch (action.type) {
        case 'ROUTE_INPUT':
            return turnIntoRoute(action.payload);
        case 'CLEAR_INPUT':
            return '';    
        default:
            return state;
    }
        
}

export default combineReducers({
    newRouteInput,
    // loginMessage,
    // registrationMessage,
  });