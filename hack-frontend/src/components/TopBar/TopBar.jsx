import { AppBar, Badge, Box, Button, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import NITKLogo from '../../assets/images/nitk-logo.png';
import { FiArrowUpRight, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from "../../store/JWTReducer/jwt.types"
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appbar: {
    "&>*": {
      justifyContent: "space-between"
    },
    boxSizing: "border-box"
  },
  links: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 800,
    letterSpacing: 2,
    paddingLeft: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      fontSize: theme.typography.subtitle2.fontSize,


    }
  },
  subtitle: {
    paddingRight: theme.spacing(5),
    color: "black"

  },
  linkContainer: {
    display: "flex",
    backgroundColor: "transparent",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
}))


const TopBar = (props) => {
  const classes = useStyles()
  const isLoggedIn = useSelector(state => state.auth.loggedIn)
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch({ type: LOGOUT })
    navigate("/login")
  }

  return (

    <AppBar style={{backgroundColor:"transparent"}} position="fixed" elevation={0}>
      <Toolbar>
        <Box mr={5}>
          <img style={{ height: "32px" }} alt="logo" src={NITKLogo} />
        </Box>

        {isLoggedIn && <Box display="flex" justifyContent="center">
        <Link to="/">

          <Typography className={classes.subtitle} variant="body2">
            Dashboard
          </Typography>
          </Link>

          <Link to="/team">
          <Typography className={classes.subtitle} variant="body2">
            Team
          </Typography>
          </Link>

        </Box>}


         <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
        >
          {isLoggedIn && (
            <Box display='flex'>
              <Typography color="primary" className={classes.subtitle} variant="body2">
                {user.name}
              </Typography>
            <IconButton onClick={handleLogout} size="small"  className={classes.shoppingButton}>
                <FiLogOut/>
            </IconButton>
            </Box>
            )
        }
        </Box>
        
      </Toolbar>


    </AppBar>


  );
};

export default TopBar;