import {ChangePassword} from '../Form.js';
import {SendOTPForm} from '../Form.js';
import {useState} from 'react';
import {API} from '../APIInfo.js';
import { useHistory } from 'react-router-dom';

function ForgotPassword(){
    const history=useHistory();
    const [showPChange,setShowPChange]=useState(false);
    const [email,setEmail]=useState("");
    const [emailMessage,setEMessage]=useState("");
    const [otpMessage,setOMessage]=useState("");
    const submitHandlerEmail=(values)=>{
        fetch(`${API}/users/send-email`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res)=>res.json())
        .then((value)=>{
            if(value.msg!=='Email not found'){
            setShowPChange(true); setEmail(values.email);
            }
            else{
                setEMessage(value.msg);
            }
        })
        .catch((error)=>{console.log(error);});
    };
    const submitHandlerCPassword=(values)=>{
        const data={...values,email};
        console.log(data);
        fetch(`${API}/users/change-password`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((value)=>{if(value.msg==='Password changed!'){history.push('/');}else{setOMessage(value.msg);}})
        .catch((error)=>{console.log(error); });
    };
    return(<div>{showPChange?<ChangePassword submitHandler={submitHandlerCPassword} message={otpMessage} setShowPChange={setShowPChange} setOMessage={setOMessage}/>:<SendOTPForm submitHandler={submitHandlerEmail} message={emailMessage}/>}</div>);
}

export {ForgotPassword};