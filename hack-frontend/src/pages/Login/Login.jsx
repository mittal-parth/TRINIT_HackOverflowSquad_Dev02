import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { blueGrey } from '@mui/material/colors';
import auth from '../../services/auth/auth';
import { useDispatch } from 'react-redux';
import { LOGIN } from "../../store/JWTReducer/jwt.types"
import { useNavigate } from 'react-router-dom';
import user from '../../services/user/user';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  appbar: theme.mixins.toolbar
}))
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
    error: false,
    message: ''
  });

  function loginHandler(event) {

    auth.login({email:login.email, password:login.password})
    .then((res)=>{
      user.info(res.data.key)
      .then((userInfoData=>{
      dispatch({type:LOGIN, payload:{token:res.data.key, user: userInfoData.data}})
      navigate('/')
      }))
    })
    .catch()
  }

  function handleEmail(event) {
    setLogin(prev=> ({...prev, email: event.target.value}))
  }

  function handlePassword(event) {
    setLogin(prev=> ({...prev, password: event.target.value}))
  }

  return (
    <>
    <TopBar/>
    <Grid container bgcolor={blueGrey[400]} height={"100vh"} alignItems={"center"}>
      
      <Grid item xs={4}>
    <div className={classes.appbar}/>

        <LeftContainer
        handleEmail={handleEmail}
        handlePasword={handlePassword}
        loginHandler={loginHandler}/>
      </Grid>
      <Grid item xs={8} style={{backgroundImage:'url("https://cdnb.artstation.com/p/assets/video_clips/images/024/538/805/large/pixel-jeff-thumb.jpg?1582740711")'}}
      height={"100%"}>
        <RightContainer/>
      </Grid>
    </Grid>
    </>
  );
};


const LeftContainer = ({handleEmail, handlePasword, loginHandler}) => {
  return (
  <Box p={3} >
    <Typography color="textSecondary" gutterBottom variant="subtitle2">
      Start for free
    </Typography>
    <Typography color="textPrimary" style={{fontWeight:700}} variant="h4">
      Login to start <span>.</span>
    </Typography>
    <Typography color="textSecondary" paragraph variant="subtitle2">
      Don't have a account? <span style={{color:blueGrey[100],textDecoration:"underline"}}>Sign up</span>
    </Typography>

    <TextField onChange={handleEmail} style={{paddingBottom:10}} variant="filled" fullWidth label="email" size="small"></TextField>
    <TextField onChange={handlePasword} style={{paddingBottom:20}}  variant="filled" fullWidth label="password" type="password" size="small"></TextField>
    <Box textAlign="right">
    <Button variant="contained" onClick={loginHandler}>Login</Button>
    </Box>
  </Box>)  
}

const RightContainer = () => {
  return (
    <Box>

    </Box>
  )
}

export default Login;