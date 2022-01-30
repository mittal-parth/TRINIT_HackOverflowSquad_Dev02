import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import { Autocomplete, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fade, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { FiMenu, FiMoreVertical } from 'react-icons/fi';
import bugs from '../../services/bugs/bugs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import team from '../../services/team/team';

const useStyles = makeStyles(theme => ({
  appbar: theme.mixins.toolbar
}))

const Dashboard = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const key = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.user.user_id);
  const [bugsList, setBugsList] = useState([])
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(()=>{
    bugs.list(key, id)
    .then(res => setBugsList(res.data))
  }, [])  
  return (
    <Box>
    <TopBar/>
    <div className={classes.appbar}/>
    <Box p={3}>
      <Grid spacing={2} container>
        <Grid item xs={2}>
          <ReportBugDialog open={dialogOpen} handleClose={handleClose}/>
          <Options handleOpen={handleClickOpen} />
        </Grid>
        <Grid item xs={10}>
          <BugsList bugsList={bugsList}/>
        </Grid>
      </Grid>  
    </Box>
    </Box>
  );
};


const BugsList = ({bugsList}) => {
  const navigate = useNavigate()
  function bugHandler (id) {
    navigate(`/track/${id}`)
  }
  return (<Grid spacing={1} container>  
    {bugsList.map(i => 
    <Grid item xs={3}>
      <Bug name={i.name} bugHandler={bugHandler} teamId={i.team} id={i.id} description={i.description} status={i.status} key={i}/>
      </Grid>)}
  </Grid>)
}

const Bug = ({status, id, description, bugHandler, teamId, name}) => {
  const [more, setMore] = useState(false)
  const [info, setInfo] = useState({name:""})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleDelete = () => {
    bugs.delete(undefined, id)  
    handleClose();
  }

   useEffect(()=>{
    team.getTeamById(teamId)
    .then((res)=>setInfo(res.data))
   }, [teamId])

  const desc = description
  const colorMap = {
    Unassigned:blueGrey[700],
    Work:green[700],
    Archived:red[700],
    Resolved:blue[700]
  }
  return (<Box p={2} >
    <Box onClick={(e)=>{bugHandler(id)}} mb={1} display="flex" alignItems={"center"} justifyContent="space-between">
      <Typography color="textPrimary" variant="body1">#{id} {name}</Typography>
      <Tooltip title={status}>
      <Box bgcolor={colorMap[status]} width="10px" height="10px" borderRadius="100px"/>
      </Tooltip>
    </Box>
    <Typography paragraph color="textSecondary" variant="body2">
      {more ? desc : desc.substring(0,50) + "..."}
    </Typography>
    <Box display="flex" justifyContent={"space-between"}>
      <Box>
      <Chip label={info.name} size="small" color="primary"></Chip>
      </Box>
      <IconButton onClick={handleClick} size="small">
        <FiMoreVertical fontSize={"18px"}/>
      </IconButton>
      <UpdateBugDialog bugInfo={{name, id, description, team:teamId, status}} id={id} open={openDialog} setOpen={setOpenDialog}/>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{setOpenDialog(true); handleClose();}}><Typography variant="subtitle2">Update</Typography></MenuItem>
        <MenuItem onClick={handleDelete}><Typography variant="subtitle2">Delete</Typography></MenuItem>
      </Menu>
    </Box>
  </Box>)
}

const Options = ({handleOpen}) => {
  return (<Box p={1}>
    <Button onClick={handleOpen} variant="contained" size="small" color="primary">Report bug</Button>
  </Box>)
}

const ReportBugDialog = ({open, handleClose}) => {
  const key = useSelector((state) => state.auth.token);
  const [teamsList, setTeamsList] = useState([])
  useEffect(()=>{
    team.get(undefined)
    .then(res => setTeamsList(res.data.map(i => ({value:i.id, label:i.name}))))
  }, [])
  const [bug, setBug] = useState({
    name:"",
    description:"",
    team:0
  })
  const report = () => {
    console.log(key)
    bugs.create(key,bug)
    handleClose()
  }

  
  return  <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Report bug</DialogTitle>
  <DialogContent>
    <TextField onChange={(e)=>setBug(p=>({...p, name:e.target.value}))} label="Name" fullWidth/>
    <TextField onChange={(e)=>setBug(p=>({...p, description:e.target.value}))} label="Description" multiline minRows={3} fullWidth/>
    <Autocomplete
      disablePortal
      onChange={(event, newValue) => {
        setBug(p=>({...p, team:newValue.value}))
      }}
      options={teamsList}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Team" />}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={report}>Report</Button>
  </DialogActions>
</Dialog>
}

const UpdateBugDialog = ({open, setOpen, id, bugInfo}) => {
  const key = useSelector((state) => state.auth.token);
  const [teamsList, setTeamsList] = useState([])
  const [statusList, setStatusList] = 
  useState([{label:"Unassigned", value:"Unassigned"},{label:"In progress", value:"Work-In-Progress"},
  {label:"Archive", value:"Archived"},{label:"Resolved", value:"Resolved"}])

  useEffect(()=>{
    team.get(undefined)
    .then(res => setTeamsList(res.data.map(i => ({value:i.id, label:i.name}))))
  }, [])
  const [bug, setBug] = useState({
    id:id,
    name:"",
    description:"",
    team:0,
    status:""
  })
  const update = () => {
    Object.keys(bug)
    .forEach(i => (bug[i] === "" || bug[i] === undefined) && delete bug[i])
    bugs.update(key,id,bug)
    setOpen(false)
  }
  
  return  <Dialog open={open} onClose={()=>setOpen(false)}>
  <DialogTitle>Update bug</DialogTitle>
  <DialogContent>
    <TextField defaultValue={bugInfo.name} onChange={(e)=>setBug(p=>({...p, name:e.target.value}))} label="Name" fullWidth/>
    <TextField defaultValue={bugInfo.description} onChange={(e)=>setBug(p=>({...p, description:e.target.value}))} label="Description" multiline minRows={3} fullWidth/>
    <Autocomplete
      disablePortal
      defaultValue={teamsList.find(i => i.value === bugInfo.team)}
      onChange={(event, newValue) => {
        setBug(p=>({...p, team:newValue.value}))
      }}
      options={teamsList}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Team" />}
    />
    
    <Autocomplete
      disablePortal
      defaultValue={statusList.find(i => i.value === statusList.value)}

      onChange={(event, newValue) => {
        setBug(p=>({...p, status:newValue.value}))
      }}
      options={statusList}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Status" />}
    />

  </DialogContent>
  <DialogActions>
    <Button onClick={update}>Report</Button>
  </DialogActions>
</Dialog>
}



export default Dashboard;