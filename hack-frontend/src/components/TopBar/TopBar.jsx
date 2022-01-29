import { AppBar, Badge, Box, Button, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import NITKLogo from '../../assets/images/nitk-logo.png';
import { FiShoppingBag } from 'react-icons/fi';

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
    color: "white"

  },
  linkContainer: {
    display: "flex",
    backgroundColor: "transparent",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  iconContainer: {
    display: "flex",
    backgroundColor: "transparent",
    border: "none",
    paddingRight: "56px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(2),
    }
  },

  accountButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawer: {
  },

  searchBar: {
    backgroundColor: theme.palette.secondary.light,
    marginRight: theme.spacing(4),
    borderRadius: "7px",
    fontSize: "12px",
    paddingLeft: theme.spacing(1),
    boxShadow: theme.shadows[10]
  }

}))


const TopBar = (props) => {
  const classes = useStyles()

  return (

    <AppBar position="absolute" elevation={0}>
      <Toolbar>

        <Box mr={5}>
          <img style={{ height: "32px" }} alt="logo" src={NITKLogo} />
        </Box>

        <Box display="flex" justifyContent="center">

          <Typography className={classes.subtitle} variant="body2">
            Home
          </Typography>

          <Typography className={classes.subtitle} variant="body2">
            Dashboard
          </Typography>

          <Typography className={classes.subtitle} variant="body2">
            Courses
          </Typography>

          <Typography className={classes.subtitle} variant="body2">
            Forums
          </Typography>

        </Box>


        <Box
          display="flex"
          justifyContent="flex-end"
        >
          
          
            <IconButton size="small"  className={classes.shoppingButton}>
              <Badge badgeContent={3} color="primary">
                <FiShoppingBag/>
              </Badge>
            </IconButton>


            <IconButton size="small"  className={classes.shoppingButton}>
              <Badge badgeContent={3} color="primary">
                <FiShoppingBag/>
              </Badge>
            </IconButton>





         {/* <Link to={`/user/${logged.user.id}`}>   <IconButton size="small" className={classes.accountButton}>
              <Person/>
            </IconButton>
            </Link> */}

          {/* <IconButton 
            className={classes.menuButton}>
              <MenuIcon/>
            </IconButton> */}

        </Box>
      </Toolbar>


    </AppBar>


  );
};

export default TopBar;