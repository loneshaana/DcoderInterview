/**
 * Redux reducers to returrn the mutable store
 */
import { combineReducers } from 'redux';

const loginReducer = (state=null , action) =>{
    switch(action.type){
        case 'LOGIN_USER':
            return {...state , ...action.payload};
        case 'UPDATE_LOGGED_USER':
            return {...state,...action.payload}
        default:
            return state;
    }
}

const userThreads = (state={threads:[],error:null} , action) =>{
    switch(action.type){
        case 'USER_THREADS_SUCCESS':
            return {...state , threads:[...action.payload]};
        case 'USER_THREADS_ERROR':
            return {...state,error:action.error};
        case "UPDATE_USER_THREADS":
            return{...state,threads:[...state.threads ,action.payload]};
        default:
            return state;
    }
}

const loaders = (state={threadsLoading:false,creatingThread:false,loggingIn:false,registering:false} , action) =>{
    switch(action.type){
        case 'LOADING_THREADS':
            return {...state , threadsLoading:action.loading};
        case 'CREATING_THREAD':
            return{...state,creatingThread:action.loading};
        case 'LOGGING_IN':
            return {...state,loggingIn:action.loading}
        case 'REGISTERING':
            return {...state,registering:action.loading}
        default:
            return state;
    }
}

const filters = (state={filterBy:''},action) =>{
    switch(action.type){
        case 'FILTER_BY':
            return{...state,filterBy:action.payload};
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    login:loginReducer,
    userThreads:userThreads,
    filter:filters,
    loaders
});

export default rootReducer;