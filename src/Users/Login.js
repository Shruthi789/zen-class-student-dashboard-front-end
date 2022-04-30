import {API} from '../APIInfo';
import {LoginForm} from '../Form';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login(){
    const [message,setMessage]=useState("");
    const history=useHistory();
    const submitHandler=(values)=>{
        console.log(values);
        fetch(`${API}/users/signin`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res)=>res.json())
        .then(({msg,token,type,username})=>{localStorage.setItem('token',token); localStorage.setItem('type',type); localStorage.setItem('name',username);history.push('/movies');})
        .catch((error)=>{console.log(error);values.username="";values.password="";setMessage("Invalid Credentials"); });
    };
    return( 
    <div className="movies">
    <div className='movies-login'>
        <div>
            <img src="https://www.pngmart.com/files/5/Movie-PNG-Image.png" alt="Movies" className="login-image"/>
        </div>
        <Divider orientation="vertical" flexItem sx={{backgroundColor:'lavender',visibility:{xs:'hidden',md:'visible'}}}/>
        <div className='movies-login-form'>
            <h3 className="heading-style">Welcome to the Movies App!!</h3>
            <LoginForm submitHandler={submitHandler}/>
            <p className="message-style">{message}</p>
            <Link to="/forgotpassword" sx={{color:'lavender'}}>Forgot Password?</Link> <p style={{color:'lavender'}}>New User? <Link to="/signup" sx={{color:'lavender'}}> Sign up</Link></p>
        </div>
    </div>
    </div>);
}

export {Login};