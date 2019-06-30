import React from 'react';
import { withCookies } from 'react-cookie';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
// import Login from './components/login';
import Register from './components/register';
import Threads from './components/threads'
import WithAuthentication from './authentication/withAuthentication';
import {connect} from 'react-redux';
import {
  ToastProvider,
} from 'react-toast-notifications';


class Routes extends React.Component{

  componentDidMount(){
    const {cookies,UpdateLoggedUser} = this.props;
    console.log(cookies)
    const loggedUser = cookies.get('loggedUser');
    if(loggedUser && typeof loggedUser === 'object'){
      console.log(loggedUser)
        UpdateLoggedUser(loggedUser);
    }
}
  render(){
    console.log(this.props.cookies)

    return(
      <ToastProvider>
        <Router>
          <Switch>
            {/* <Route path="/" exact={true} componen */}(Login)))} />
            <Route path="/threads" exact={true} component={connect(mapStateToProps)(WithAuthentication(Threads))} />
            <Route path="/register" exact={true} component={connect(mapStateToProps)(WithAuthentication(Register))} />
            <Route path="*" exact={true} component={connect(mapStateToProps)(WithAuthentication(Threads))} />
          </Switch>
        </Router>
        </ToastProvider>
    )
  }
}
const mapStateToProps = (state) =>({
  loggedUser:state.login
})

const mapDispatchToProps = (dispatch) => ({
  UpdateLoggedUser:(user) =>dispatch({type:"UPDATE_LOGGED_USER",payload:user})
});

export default connect(mapStateToProps , mapDispatchToProps)(withCookies(Routes));
