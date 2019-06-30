import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink,withRouter} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));



 function CustomAppBar({cookies,location}){
  const classes = useStyles();
  const loggedUser = cookies.get('loggedUser');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }
    
    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }
    
    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }
    
  
    const SideInfo = () =>{
        if(loggedUser && loggedUser.user && loggedUser.user.username){
            return (
                    <React.Fragment>
                        <div className={classes.root} />
                            <div className={classes.sectionDesktop}>
                            {loggedUser.user.username}
                        </div>
                    </React.Fragment>
                )
        }else{
            if(location.pathname === '/register'){
                return(
                    <React.Fragment>
                        <Typography variant="h5" component="h4">
                            <NavLink to="/login">Login</NavLink>
                        </Typography>
                    </React.Fragment>
                )
            }else{
                return(
                    <React.Fragment>
                        <Typography variant="h5" component="h4">
                            <NavLink to="/register">Register</NavLink>
                        </Typography>
                    </React.Fragment>
                )
            }
        }
    }
   
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dcoder
          </Typography>
            <SideInfo />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(withCookies(CustomAppBar));