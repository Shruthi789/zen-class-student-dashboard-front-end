import { Route,Switch,useHistory,useRouteMatch } from "react-router-dom";
import { useState,createContext,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import {API} from '../APIInfo.js'
import {WrongURL} from '../WrongURL.js';
import Paper from '@mui/material/Paper';
import {StudentInfo} from './StudentInfo';
import { EditStudent } from "./EditStudent.js";

export const studentContext= createContext({});


function Home() {
  const [info, setInfo]=useState(null);
  const getInfo=()=>{
     const name=localStorage.getItem('name')
      fetch(`${API}/dashboard/getStudentInfo/${name}`,{
        method:'GET',
           headers:{
       'x-auth-token':localStorage.getItem('token'),
    }
   })
      .then((res)=>res.json())
      .then((data)=>setInfo(data))
      .catch((error)=>console.log(error));
   };
  useEffect(getInfo,[]);
  const {path,url} = useRouteMatch();
  const obj={info,getInfo,setInfo,url};
  const history=useHistory();
  const paperStyle={borderRadius:"0px",
  minHeight:"100vh"};
  return (
      <Paper elevation={4} style={paperStyle}>
     <studentContext.Provider value={obj}>
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className="navBar">
         <h4>Hi, {localStorage.getItem('name')}!</h4>
        <Button color="inherit"  onClick={()=>{history.push(`${url}`)}} variant="text">Movies List</Button>
        {localStorage.getItem('type')==='Admin'?<Button color="inherit"  onClick={()=>{history.push(`${url}/add`)}} variant="text">Add Movies</Button>:" "}
        <IconButton aria-label="brightnessToggle" color="inherit" onClick={brightnessChange}>
         {(mode==='light')?<Brightness4Icon />:<Brightness5Icon />}
        </IconButton>
        <Button color="inherit"  onClick={()=>{history.push('/')}} variant="text">Log Out</Button>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Switch>
    <Route exact path={path}>
        <StudentInfo/>
      </Route>
        <Route path={`${path}/edit/:id`}>
          <EditStudent/>
        </Route>
        <Route path={`${path}/**`}>
          <WrongURL/>
        </Route>
    </Switch>
    </div>
    </studentContext.Provider>
    </Paper>
  );
}




export {Home};
