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

const loaders = (state={threadsLoading:false,creatingThread:false,loggingIn:false} , action) =>{
    switch(action.type){
        case 'LOADING_THREADS':
            return {...state , threadsLoading:action.loading};
        case 'CREATING_THREAD':
            return{...state,creatingThread:action.loading};
        case 'LOGGING_IN':
            return {...state,loggingIn:action.loading}
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    login:loginReducer,
    userThreads:userThreads,
    loaders
});

export default rootReducer;