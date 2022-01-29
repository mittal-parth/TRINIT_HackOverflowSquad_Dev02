import { Button, Typography } from '@mui/material';
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
      <Button size="small" startIcon={<FiArrowLeft fontSize="small"/>}>
        Back to bug list
      </Button>
      <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
      <Typography color="textPrimary" style={{fontWeight:700}} variant="h4">
        #1 Issue in production
      </Typography>
     </Box>
     </Box>
    </>
  );
};

export default Team;