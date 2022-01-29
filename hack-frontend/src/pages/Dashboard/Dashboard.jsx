import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import { Chip, Divider, Fade, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { FiMenu, FiMoreVertical } from 'react-icons/fi';
import bugs from '../../services/bugs/bugs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appbar: theme.mixins.toolbar
}))

const Dashboard = () => {
  const classes = useStyles();
  const key = useSelector((state) => state.auth.key);
  useEffect(()=>{
    bugs.list(key)
  }, [])  
  return (
    <Box>
    <TopBar/>
    <div className={classes.appbar}/>
    <Box p={3}>
      <Grid spacing={2} container>
        <Grid item xs={2}>
          <Options/>
        </Grid>
        <Grid item xs={10}>
          <BugsList/>
        </Grid>
      </Grid>  
    </Box>
    </Box>
  );
};


const BugsList = () => {
  const navigate = useNavigate()
  function bugHandler (id) {
    navigate(`/track/${id}`)
  }
  return (<Grid spacing={1} container>  
    {[{id:1, status:'work'},{id:1, status:'archive'},{id:5, status:'work'},{id:1, status:'resolved'},{id:1, status:'unassigned'}].map(i => 
    <Grid onClick={(e)=>{bugHandler(i.id)}} item xs={3}>
      <Bug status={i.status} key={i}/>
      </Grid>)}
  </Grid>)
}

const Bug = ({status}) => {
  const [more, setMore] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const desc = "lorem ipsum dotum ipsum lorem upsd adalkn asdlajsd aklsdas klnasdasd asdnkla kland akada nlkad a"
  const colorMap = {
    unassigned:blueGrey[700],
    work:green[700],
    archive:red[700],
    resolved:blue[700]
  }
  return (<Box p={2} >
    <Box mb={1} display="flex" alignItems={"center"} justifyContent="space-between">
      <Typography color="textPrimary" variant="body1">#1 Issue</Typography>
      <Tooltip title={status}>
      <Box bgcolor={colorMap[status]} width="10px" height="10px" borderRadius="100px"/>
      </Tooltip>
    </Box>
    <Typography paragraph color="textSecondary" variant="body2">
      {more ? desc : desc.substring(0,50) + "..."}
    </Typography>
    <Box display="flex" justifyContent={"space-between"}>
      <Box>
      <Chip label="Expired" size="small" color="primary"></Chip>
      </Box>
      <IconButton onClick={handleClick} size="small">
        <FiMoreVertical fontSize={"18px"}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Typography variant="subtitle2">Update</Typography></MenuItem>
        <MenuItem onClick={handleClose}><Typography variant="subtitle2">Delete</Typography></MenuItem>
        <MenuItem onClick={handleClose}><Typography variant="subtitle2">Help</Typography></MenuItem>
      </Menu>
    </Box>
  </Box>)
}

const Options = () => {
  return (<Box bgcolor={blueGrey[100]} p={1} borderRadius="14px">
    <Typography variant="subtitle2">
      Menu
    </Typography>
    
  </Box>)
}

export default Dashboard;