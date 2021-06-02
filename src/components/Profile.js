import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import {app} from '../mockfirebase.js'
import { Redirect ,useHistory} from 'react-router';
const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));
function Profile() {
  const history=useHistory()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleLogout=()=>{
      console.log("clicked");
         app.auth().signOut()
      history.push('/login')
  }
  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  return (
    <div>
      <IconButton  onClick={handleClick}><AccountCircleIcon style={{padding:"0 5px"}}/></IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
                <Typography
                variant="subtitle1"
                id="hello"
                style={{ color: "#8C8B96" }}
                >
                Hello!
                </Typography>
                <Typography>Are you want to Logout?</Typography>
                <Button variant="outlined" fullWidth onClick={handleLogout} color="primary">
                Logout
                </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default Profile
