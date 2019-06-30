/**
 * Redux actions -> API calls
 */
import axios from 'axios';
const endpoints = {
    host:'http://localhost',
    port:'8080'
}

const DCoderGet = (endpoint) =>{
    const url = `${endpoints.host}:${endpoints.port}${endpoint}`;
    return new Promise ( (resolve) =>{
        resolve(axios.get(url))
    })
}

const getLoggedUserDetails = (getData:Function) =>{
    const loggedInUser = getData().login;
    if(loggedInUser && loggedInUser.user && loggedInUser.user._id && loggedInUser.token){
        return {id:loggedInUser.user._id,token:loggedInUser.token};
    }
    return false;
}

const DCoderPost = (endpoint,data) =>{
    const url = `${endpoints.host}:${endpoints.port}${endpoint}`;
    return new Promise ( (resolve) =>{
        resolve(axios.post(url,data))
    })
}

export const LoginAction = (data,cookies) =>{
    return (dispatch) => {
        dispatch({type:'LOGGING_IN',loading:true});
         return DCoderPost('/api/login',data)
            .then( response =>{
                if(response.status === 200){
                    const {data} = response;
                    dispatch({type:"LOGIN_USER",payload:data});
                    dispatch({type:'LOGGING_IN',loading:false});
                    cookies.set('loggedUser' , data , {path:'http://localhost:3000',sameSite:true});
                    return true;
                }else{
                    throw new Error("Error while logging in")
                }
            }).catch(error =>{
                dispatch({type:'LOGGING_IN',loading:false});
                return false;
            })
    }
}

export const RegisterAction = (data) =>{
    return (dispatch) =>{
        return DCoderPost('/api/register' , (data))
            .then( (response) =>{
                if(response.status === 200){
                    const {data} = response;
                    console.log("REGISTERED")
                    return true;
                    //registered
                }else{
                    throw new Error("Unable to register the user");
                }
            }).catch(error =>{
                return false;
            })
    }
}

export const getThreads = () =>{
    return (dispatch,getData) =>{
        const details = getLoggedUserDetails(getData);
        if(!details) return;
        dispatch({type:'LOADING_THREADS',loading:true});
        return DCoderGet(`/api/list/thread?token=${details.token}&userId=${details.id}`)
                .then(response =>{
                    const {data} = response;
                    if(data.done){
                        dispatch({type:'USER_THREADS_SUCCESS',payload:data.result});
                        dispatch({type:'LOADING_THREADS',loading:false});
                    }else{
                        throw new Error('unable to fetch the threads of the user');
                    }
                })
                .catch(error =>{
                    dispatch({type:"USER_THREADS_ERROR",error:error});
                    dispatch({type:'LOADING_THREADS',loading:false});
                })
    }
}

export const CreateThreadAction = (data) =>{
    return (dispatch,getData) =>{
        const details = getLoggedUserDetails(getData);
        if(!details.token) return;
        data.token = details.token;
        data.date = new Date();
        dispatch({type:'CREATING_THREAD' , loading:true});
        return DCoderPost(`/api/create/thread?token=${details.token}` , (data))
            .then( (response) =>{
                if(response.status === 200){
                    const {data} = response;
                    dispatch({type:'UPDATE_USER_THREADS',payload:data.result})
                    dispatch({type:'CREATING_THREAD' , loading:false});
                }else{
                    throw new Error("Unable to register the user");
                }
            }).catch(error =>{
                dispatch({type:'CREATING_THREAD' , loading:false});
            })
    }
}
