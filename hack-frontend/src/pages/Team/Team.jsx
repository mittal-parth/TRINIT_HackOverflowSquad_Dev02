import { Button, Chip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
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
        Team Dhamaka
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Anas
      </Typography>
     </Box>
    </>
  );
};

export default Team;