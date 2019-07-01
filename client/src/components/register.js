/**
 * Component to register the new users
 */
import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies } from 'react-cookie';
import {RegisterAction} from '../redux/actions/userActions';

class Register extends React.Component{
  state ={
    username:'',
    password:'',
    cpassword:'',
    invalidPassword:false
  }

  signup = () =>{
    // const {cookies} = this.props;
    // this.props.onLogin({username:this.state.username,password:this.state.password})
    //   .then( () =>{
    //       cookies.set('loggedUser' , this.props.loggedInUser , {path:'http://localhost:3000',sameSite:true});
    //       console.log(cookies)
    //   })
    const {username,password,cpassword} = this.state;
    if(password !== cpassword || password === '' || cpassword === ''){
        this.setState({invalidPassword:true});
    }else{
        this.setState({invalidPassword:false});
        this.props.onRegister({username,password})
            .then( res =>{
                if(res){
                    window.location.href="/login";
                }
            })
    }
  }

  onChange = ({target}) =>{
    const {name,value} = target;
    this.setState({[name]:value});
  }

  render(){
    const {username,password,invalidPassword,cpassword} = this.state;
    const {registering} = this.props;
    return(
      <React.Fragment>
        <div className="login-box">
            <h3>Register</h3>
            <div className="textbox">
                <i className="fa fa-user" aria-hidden="true" />
                <input type="text" placeholder="username" name="username" value={username} onChange={this.onChange} />
            </div>
            <div className="textbox">
                <i className="fa fa-lock" aria-hidden="true" />
                <input type="password" placeholder="password" name="password" value={password} onChange={this.onChange} />
            </div>
            <div className="textbox">
                <i className="fa fa-lock" aria-hidden="true" />
                <input type="password" placeholder="confirm password" name="cpassword" value={cpassword} onChange={this.onChange} />
            </div>
            {invalidPassword && (
                <div>
                    <span>please check your password</span>
                </div>
            )}
            {registering ? (
              <button className="btn">Registering...</button>
            ) :(
              <button className="btn" onClick={this.signup}>signup</button>
            )}
            </div>
        </React.Fragment>
    )
  }
}


 const mapStateToProps  =(state) =>({
  loggedInUser:state.login,
  registering:state.loaders.registering
 });

 const mapDispatchToProps = (dispatch) =>({
   onRegister:bindActionCreators(RegisterAction , dispatch)
 });

export default connect(mapStateToProps , mapDispatchToProps)(withCookies(Register));
