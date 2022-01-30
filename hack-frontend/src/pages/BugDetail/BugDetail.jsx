import { Button, Chip, Divider, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, {useState, useEffect} from 'react';
import { FiArrowLeft, FiPenTool } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import bugs from '../../services/bugs/bugs';


const useStyles = makeStyles(theme => ({
  appbar: theme.mixins.toolbar
}))

const BugDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [bug, setBug] = useState({})
  const params = useParams()

  useEffect(()=>{
    bugs.get(undefined,params.id)
    .then((res)=>setBug(res.data))
  }, [])

  function backToBugsHandler (){
    navigate('/')
  }

  return (
    <>
    <Box bgcolor={purple[100]}>
    <TopBar/>
    <div className={classes.appbar}/>
    <Box p={3}>
      <Button onClick={backToBugsHandler} size="small" startIcon={<FiArrowLeft fontSize="small"/>}>
        Back to bug list
      </Button>
      <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
      <Typography color="textPrimary" style={{fontWeight:700}} variant="h4">
        #{params.id} {bug.name}
      </Typography>

      <Chip color="primary" icon={<FiPenTool/>} size="small" label="Parth mittal"></Chip>
            
      </Box>
    </Box>
    </Box>
    <Box p={3}>
    <Typography gutterBottom color="primary" style={{textDecoration:"underline"}} variant="body2">
      Created 10 days ago</Typography>

      <Typography color="textSecondary" variant="subtitle2">
        {bug.description}
      </Typography>
      <Box align="right">
      <Typography align="right" color="primary" style={{textDecoration:"underline"}} variant="body2">Managed by Anas Aijaz</Typography>
      <Typography align="right" color="primary" style={{textDecoration:"underline"}} variant="body2">Expires in 12 Days</Typography>

      </Box>
    </Box>
    </>
  );
};

export default BugDetail;