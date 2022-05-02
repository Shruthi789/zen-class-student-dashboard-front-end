import {useState,useEffect} from 'react';
import {API} from '../APIInfo.js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

function Student({data}) {
    const [key,value]=data;
    return (
      <Card sx={{ minWidth:340}}>
       <CardContent>
       <Typography variant="h5" component="div">
          {key}
        </Typography>
         {key==="completion"? <LinearProgress variant="determinate" value={value} />:value}
        </CardContent>
      </Card>
    );
  }

function StudentInfo(){
  const [info, setInfo]=useState(null);
  const getInfo=()=>{
     const name=localStorage.getItem('name');
      fetch(`${API}/dashboard/getstudentInfo/${name}`,{
        method:'GET',
           headers:{
       'x-auth-token':localStorage.getItem('token'),
    }
   })
      .then((res)=>res.json())
      .then((data)=>{console.log(data);setInfo(data)})
      .catch((error)=>console.log(error));
   };
   useEffect(getInfo,[]);
    const infoData=Object.entries(info);
    return (
    <div>
    {infoData.length!==0?
    <div>
    <h1 className="heading">Student Information</h1>
    <div className="dashboard-arrangement">
      {infoData.slice(1).map((data,index) => <Student key={index} data={data}/>)}
    </div>
    </div>:<h2>Loading...</h2>}
    </div>);
}

export {StudentInfo};