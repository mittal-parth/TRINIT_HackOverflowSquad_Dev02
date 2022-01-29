import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { blueGrey } from '@mui/material/colors';
import auth from '../../services/auth/auth';

const useStyles = makeStyles(theme => ({
  appbar: theme.mixins.toolbar
}))
const Signup = () => {
  const classes = useStyles();
  const [signup, setSignup] = useState({
    email: '',
    password1: '',
    password2: '',
    username: '',
    error: false,
    message: ''
  });


  function signupHandler(event) {
    auth.signup({...signup})
  }

  function handleEmail(event) {
    setSignup(prev=> ({...prev, email: event.target.value}))
  }

  
  function handleUsername(event) {
    setSignup(prev=> ({...prev, username: event.target.value}))
  }


  function handlePassword1(event) {
    setSignup(prev=> ({...prev, password1: event.target.value}))
  }


  function handlePassword2(event) {
    setSignup(prev=> ({...prev, password2: event.target.value}))
  }

  return (
    <>
    <TopBar/>
    <Grid container bgcolor={blueGrey[400]} height={"100vh"} alignItems={"center"}>
      
      <Grid item xs={4}>
    <div className={classes.appbar}/>

        <LeftContainer
          emailHandler={handleEmail}
          password1Handler={handlePassword1}
          password2Handler={handlePassword2}
          usernameHandler={handleUsername}
          setSignup={signupHandler}/>
        
      </Grid>
      <Grid item xs={8} style={{backgroundImage:'url("https://cdnb.artstation.com/p/assets/video_clips/images/024/538/805/large/pixel-jeff-thumb.jpg?1582740711")'}}
      height={"100%"}>
        <RightContainer/>
      </Grid>
    </Grid>
    </>
  );
};


const LeftContainer = ({setSignup, emailHandler, password1Handler, password2Handler, usernameHandler}) => {
  return (
  <Box p={3} >
    <Typography color="textSecondary" gutterBottom variant="subtitle2">
      Start for free
    </Typography>
    <Typography  color="textPrimary" style={{fontWeight:700}} variant="h4">
      Create an account <span>.</span>
    </Typography>
    <Typography color="textSecondary" paragraph variant="subtitle2">
      Don't have a account? Sign up
    </Typography>

    <TextField onChange={usernameHandler} style={{paddingBottom:10}} autoComplete='off' variant="filled" fullWidth label="Username" size="small"></TextField>
    <TextField onChange={emailHandler} style={{paddingBottom:10}} autoComplete='off' variant="filled" fullWidth label="Email" size="small"></TextField>
    <TextField onChange={password1Handler} style={{paddingBottom:20}}  variant="filled" fullWidth label="Password" type="password" size="small"></TextField>
    <TextField onChange={password2Handler} style={{paddingBottom:20}}  variant="filled" fullWidth label="Confirm password" type="password" size="small"></TextField>
    
    <Box textAlign="right">
    <Button variant="contained" onClick={setSignup}>Signup</Button>
    </Box>
  </Box>)  
}

const RightContainer = () => {
  return (
    <Box>

    </Box>
  )
}

export default Signup;