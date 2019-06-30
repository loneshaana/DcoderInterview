import React from 'react';
import Threads from '../components/threads';
import Login from '../components/login';
import AppBar from '../util/AppBar';

const WithAuthentication = (WrappedFunction) =>{
        return class extends React.Component{
            render(){
                console.log("WITH AUTHENTICATIOIN PROPS " , this.props)
                const {location,loggedUser} = this.props;
                if(loggedUser && loggedUser.token  && loggedUser.user._id){
                    if(location.pathname !== '/login'){
                        return (
                            <React.Fragment>
                                <AppBar />
                                <WrappedFunction loggedInUser={loggedUser} rest={this.props} />
                            </React.Fragment>
                        )
                    }else{
                       return (
                           <React.Fragment>
                               <AppBar />
                               <Threads loggedInUser={loggedUser} />
                           </React.Fragment>
                       )
                    }
                }else if(location.pathname === '/register'){
                    return (
                        <React.Fragment>
                            <AppBar />
                            <WrappedFunction />
                        </React.Fragment>
                    )
                }
                else{
                    return (
                        <React.Fragment>
                            <AppBar />
                            <Login />
                        </React.Fragment>
                    )
                }
        }
    }
}

export default WithAuthentication;