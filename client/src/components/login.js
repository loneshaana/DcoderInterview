import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies } from 'react-cookie';
import {LoginAction} from '../redux/actions/userActions';
import { withToastManager } from 'react-toast-notifications';

class Login extends React.Component{
  state ={
    username:'',
    password:''
  }

  onLogin = () =>{
    const {cookies,toastManager} = this.props;
    this.props.onLogin({username:this.state.username,password:this.state.password},cookies)
    .then((flag) =>{
      if(flag){
        toastManager.add('user logged in successfully',{
            appearance: 'success',
            autoDismiss: true,
            pauseOnHover: true,
        });
      }else{
        toastManager.add('Error while loggin in ,please check your credentials',{
          appearance: 'error',
          autoDismiss: true,
          pauseOnHover: true,
      });
      }
    })
  }

  onChange = ({target}) =>{
    const {name,value} = target;
    this.setState({[name]:value});
  }

  render(){
    const {username,password} = this.state;
    const {loggingIn} = this.props;
    return(
      <React.Fragment>
        <div className="login-box">
            <h3>Login</h3>
            <div className="textbox">
                <i className="fa fa-user" aria-hidden="true" />
                <input type="text" placeholder="username" name="username" value={username} onChange={this.onChange} />
            </div>
            <div className="textbox">
                <i className="fa fa-lock" aria-hidden="true" />
                <input type="password" placeholder="password" name="password" value={password} onChange={this.onChange} />
            </div>
            {
              loggingIn ? (
                <button className="btn">LoggingIn...</button>
              ):(
                <button className="btn" onClick={this.onLogin}>Login</button>
              )
            }
        </div>
      </React.Fragment>
    )
  }
}


 const mapStateToProps  =(state) =>({
  loggedInUser:state.login,
  loggingIn:state.loaders.loggingIn
 });

 const mapDispatchToProps = (dispatch) =>({
   onLogin:bindActionCreators(LoginAction , dispatch)
 });

export default connect(mapStateToProps , mapDispatchToProps)(withCookies(withToastManager(Login)));
