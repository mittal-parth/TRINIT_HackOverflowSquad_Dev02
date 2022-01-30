import { Button, Chip, Grid, Typography } from '@mui/material';
import { blue, green, purple, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { FiArrowLeft, FiFlag, FiMail } from 'react-icons/fi';
import TopBar from '../../components/TopBar/TopBar';

const useStyles = makeStyles(theme => ({
  appbar: theme.mixins.toolbar
}))


const Team = () => {
  const classes = useStyles();

  return (
    <>
     <TopBar/>
     <div className={classes.appbar}></div>
     <Box p={3}>
      <Typography color="textPrimary" style={{fontWeight:700}} variant="h4">
        App Team
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
      </Typography>
      <Typography variant="subtitle2" color="primary" style={{textDecoration:"underline"}}>
        Parth Mittal <FiFlag/>
      </Typography>
     </Box>

     <Box p={3}>
       <TeamList/>
     </Box>
    </>
  );
};


function TeamList () {
  return (<Grid spacing={3} container>{[1,1,1,4,6,].map(()=><Grid xs={3} item><TeamMember/></Grid>)}</Grid>)
}

function TeamMember ({index}) {
  const colors = [purple[500], blue[500], green[500], red[500]]
  const descs = []
  const users = ["Poppy", "Parth", "Ramesh", "Anas", "Sita", "Ram"]
  const emails = ["Poppy@a.com", "Parth@a.com", "Ramesh@a.com", "Anas@a.com", "Sita@a.com", "Ram@a.com"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomUser = users[Math.floor(Math.random() * users.length)]
  const randomEmail = emails[Math.floor(Math.random() * emails.length)]

  
  return (<Box borderRadius="7px" p={1} borderTop={`10px solid ${randomColor}`}>
    <Typography style={{paddingTop:"12px", fontWeight:"600"}} color="primary" variant="body1">
      {randomUser}
    </Typography>
    <Typography paragraph color="textSecondary" variant="body2">
      This is lorem ipsum dorem ipsoskldad nalkd alkadl sm
    </Typography>

    <Typography color="textSecondary" style={{display:"flex" , alignItems:"center", justifyContent:"flex-end"}} paragraph variant="body2">
      <FiMail style={{marginRight:"8px"}}/> {randomEmail}
    </Typography>
  </Box>)
}

export default Team;