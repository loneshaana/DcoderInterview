/**
 * Component to create the thread
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CreatableMulti from '../util/MultiSelect';
import { Button } from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withToastManager } from 'react-toast-notifications';
import {CreateThreadAction} from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width:'100%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
      },
    rightIcon: {
        marginLeft: theme.spacing(1),
      },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

function CreateThread(props){
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: '',
    description: '',
    tags: [],
  });

  const checkData =() =>{
    let flag = false;
    if(values.title.length === 0){
      props.toastManager.add('Please specify the title of thread',{
        appearance: 'warning',
        autoDismiss: true,
        pauseOnHover: true,
      });
      flag = true;
    }
    if(values.description.length === 0 ){
      props.toastManager.add('please specify the description of thread',{
        appearance: 'warning',
        autoDismiss: true,
        pauseOnHover: true,
      });
      flag = true;
    }
    return flag;
  }

  const Submit =() =>{
      if(checkData()){
        return;
      }
      const dataToSend = {
          tags:[],
          title:'',
          description:''
      };
      dataToSend.title = values.title;
      dataToSend.description = values.description;
      if(values.tags.length > 0){
          values.tags.map(tag =>{
            dataToSend.tags.push(tag.value);
          })
      }
      props.registerThread(dataToSend).then( () =>{
          props.toastManager.add('Thread Created Successfully',{
            appearance: 'success',
            autoDismiss: true,
            pauseOnHover: true,
          });
          props.onClose();
      })
  }

  const handleChange = name => event => {
      if(event && event instanceof Array){
        setValues({...values,[name]:event});
      }else{
        setValues({ ...values, [name]: event.target.value });
      }
    };
        return(
            <div className={classes.container}>
                    <TextField
                        id="outlined-name"
                        label="Title"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange('title')}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows="4"
                        defaultValue={values.description}
                        className={classes.textField}
                        onChange={handleChange('description')}
                        margin="normal"
                        variant="outlined"
                    />

                    <div className={classes.textField}>
                        <CreatableMulti placeholder="please type" onChange={handleChange('tags')} />
                    </div>

                    <div>
                        {
                            props.creatingThread ? (
                                <Button variant="contained" color="primary" className={classes.button} >
                                    Creating...
                                </Button>
                            ) :(
                                <Button variant="contained" color="primary" className={classes.button} onClick={Submit} >
                                    Create
                                </Button>
                            )
                        }
                       
                    </div>
            </div>
        )
    }

    const mapStateToProps = (state) =>({
        creatingThread:state.loaders.creatingThread
    });
    const mapDispatchToProps = (dispatch) =>({
        registerThread:bindActionCreators(CreateThreadAction,dispatch)
    });
export default connect(mapStateToProps,mapDispatchToProps)(withToastManager(CreateThread));