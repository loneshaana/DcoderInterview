import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme =>({
    root:{
        flexGrow:1,
    },
    search: {
        position: 'relative',
        // float:'right',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginTop:10,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        // position: 'absolute',
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        display:'inline-flex',
        float:'right'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        borderBottom:'1px solid black',
        width: '100%',
        // float:'right',
        [theme.breakpoints.up('sm')]: {
          width: 120,
        //   float:'right',
          '&:focus': {
            width: 200,
          },
        },
      },
      inline:{
          display:'inline-flex'
      },
      typography:{
        display:'inline-flex',
        marginLeft:'23%;'
      },
      inputRoot: {
        color: 'inherit',
        float:'right'
      }
}));

function Filter({onChange}){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <div className={classes.search}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
                    Threads
                </Typography>

                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>

                <InputBase
                    placeholder="Search thread by title"
                    onChange={onChange}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    // onChange={(val) }
                    inputProps={{ 'aria-label': 'Search' }}
                />
        </div>
      </div>

    )
}

export default Filter;