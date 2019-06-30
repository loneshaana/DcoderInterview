import React from 'react';
import Card from '../util/Card';
import FloatingAddButton from '../util/FloatingButton';
import {getThreads} from '../redux/actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Model from '../util/Model';
import CreateThread from './createThread';
import { Button } from '@material-ui/core';

const DisplayThread = ({thread}) =>{
  return(
    <div>
        <Card thread={thread}/>
    </div>
  )
}

class Threads extends React.Component{
  state={
   show:false
  }

  componentDidMount(){
    // get the threads of the current loggedInUser
    const {getUserThreads} = this.props;
    getUserThreads();
  }

  render(){
    const {userThreads,threadLoading} = this.props;
    const {show} = this.state;
    const {threads} = userThreads;
    if(threadLoading){
      return <div>Loading...</div>
    }
    return(
      <div>
        {threads.map(thread =>{
          return <DisplayThread thread={thread} key={thread._id}/>
        })}
        <div className="bottomRight">
          <Button onClick ={() =>this.setState({show:!this.state.show})}>
            <FloatingAddButton/>
          </Button>
        </div>
        {
          show && (
            <Model onClose={() =>this.setState({show:false})} title="Create Thread">
              <CreateThread onClose={() =>this.setState({show:false})}/>
            </Model>
          )
        }
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  userThreads:state.userThreads,
  threadLoading:state.loaders.threadsLoading
});

const mapDispatchToProps = (dispatch) =>({
  getUserThreads:bindActionCreators(getThreads , dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Threads);