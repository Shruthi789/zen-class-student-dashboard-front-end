import {BackButton} from '../BackButton.js';
import {SignUpForm} from '../Form.js'
import {API} from '../APIInfo.js';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
function SignUp(){
    const [message,setMessage]=useState("");
    const history=useHistory();
    const submitHandler=(values)=>{
        fetch(`${API}/users/signup`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res)=>res.json())
        .then((value)=>{if(value.msg==='Success!!'){history.push('/');}else{setMessage(value.msg)}})
        .catch((error)=>{console.log(error); });
    };
    return(<div>
          <SignUpForm submitHandler={submitHandler}/>
          <p className="message-style">{message}</p>
    <br/>
    <BackButton/>
    </div>);
}

export {SignUp};