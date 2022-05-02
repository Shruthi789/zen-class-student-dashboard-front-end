import {useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {studentContext} from './Home.js';
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
    const {getInfo,info}=useContext(studentContext);
    getInfo();
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