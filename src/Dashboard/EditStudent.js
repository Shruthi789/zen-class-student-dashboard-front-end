import { useState,useContext} from 'react';
import {BackButton} from "../BackButton.js";
import {FormComponent} from '../Form.js';
import {studentContext} from './Home.js';
import {API} from '../APIInfo.js'

function EditStudent(){
  const {info}=useContext(studentContext);

     return (<div>{info?<UpdateStudent info={info}/>:<h2>Loading...</h2>}</div>)  
}
function UpdateStudent({info}){
  const {_id,name,completion,attendance,codekata,webkata,tasks}=info;
  const [message,addMessage]=useState("");
  const {getInfo}=useContext(studentContext);
  const initialValues= {
    name:name,
    completion:completion,
    attendance:attendance,
    codekata:codekata,
    webkata:webkata,
    pendingTasks:tasks.pendingTasks,
    submittedTasks:tasks.submittedTasks
  };
  const submitHandler=(values)=>{
                        const editedInfo={
                                           name:values.name,
                                           completion:values.completion,
                                           attendance:values.attendance,
                                           codekata:values.codekata,
                                           webkata:values.webkata,
                                           tasks:{
                                            pendingTasks:values.pendingTasks,
                                            submittedTasks:values.submittedTasks
                                           }
                                         };
                               fetch(`${API}/dashboard/editStudentInfo/${_id}`,{
                                 method:'PUT',
                                 headers:{
                                   'x-auth-token':localStorage.getItem('token'),
                                   'content-type':'application/json'
                                 },
                                 body:JSON.stringify(editedInfo)
                               })
                                .then(()=>{
                                  values.name=""
                                  values.completion=""
                                  values.codekata=""
                                  values.webkata=""  
                                  values.attendance=""
                                  values.pendingTasks=""
                                  values.submittedTasks=""
                                  addMessage("Student Info edited!!");
                                  getInfo();
                                  })
                                  .catch((error)=>{console.log(error);addMessage("Error!!");});
                                };
  return (<div>
    <FormComponent initialValues={initialValues} submitHandler={submitHandler}/>
    {message!=='Error!!'?<p className="form-message-style">{message}</p>:<p className="error-message-style">{message}</p>}
    <div>
    <BackButton/>
    </div>  
    </div>); 

}
export {EditStudent};