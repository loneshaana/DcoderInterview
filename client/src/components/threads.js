/**
 * Component to list and create the threads
 */
import React from 'react';
import Card from '../util/Card';
import FloatingAddButton from '../util/FloatingButton';
import {getThreads} from '../redux/actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Model from '../util/Model';
import CreateThread from './createThread';
import { Button } from '@material-ui/core';
import Filter from './filter';

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
    const {userThreads,threadLoading,filterBy} = this.props;
    const {show} = this.state;
    // const {threads} = userThreads;
    if(threadLoading){
      return <div>Loading...</div>
    }
    return(
      <div>
        <div>
          <Filter onChange={filterBy}/>
        </div>
        {userThreads.map(thread =>{
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
const filterSelector = (state) =>{
  const filterBy = state.filter.filterBy;
  if(filterBy === '') return state.userThreads.threads;
  else return state.userThreads.threads.filter(thread => thread.title.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
}
const mapStateToProps = (state) =>({
  userThreads:filterSelector(state),

  threadLoading:state.loaders.threadsLoading
});

const mapDispatchToProps = (dispatch) =>({
  getUserThreads:bindActionCreators(getThreads , dispatch),
  filterBy:({target}) =>dispatch({type:"FILTER_BY",payload:target.value})
});

export default connect(mapStateToProps,mapDispatchToProps)(Threads);