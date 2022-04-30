import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import {API} from './APIInfo.js';
import {BackButton} from './BackButton.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
/*Add and Edit Form */

function FormComponent({initialValues,submitHandler,action}){
    
    const formValidationSchema=yup.object({
        name:yup.string().required('Enter a name!!'),
        poster:yup.string().min(4).required('Enter a poster link!'),
        summary:yup.string().min(20,'Limit is 20 characters').required('Enter a summary!'),
        rating:yup.number().min(2,'Enter a higher rating').max(10,'Enter a lower rating').required('Enter a rating!'),
        cast:yup.string().min(30,'Enter a minimum of 30 characters').required('Enter the cast!'),
        language:yup.string().min(4,'Enter a minimum of 4 characters').required('Enter the language!'),
        trailer:yup.string().min(4,'Enter a minimum of 4 characters').required('Enter a trailer link!')
      });
      const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
        initialValues: initialValues,
        validationSchema:formValidationSchema,
        onSubmit:submitHandler
      })
    return (<div>
        <h2 className="heading-style">{action} USER</h2>
        <div className='adjust-form'>
        <form onSubmit={handleSubmit} className="form-style">
        <div className="form-style">
        <label className="label-style">Name: </label>
        <TextField
      id="name"
      name="name"
      label="Name"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.name && touched.name}
      helperText={touched.name?errors.name:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
        <label className="label-style">Poster: </label>
        <TextField
      id="poster"
      name="poster"
      label="Poster"
      value={values.poster}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.poster && touched.poster}
      helperText={touched.poster?errors.poster:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
      <label className="label-style">Summary: </label>
        <TextField
        id="summary"
      name="summary"
      label="Summary"
      value={values.summary}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.summary && touched.summary}
      helperText={touched.summary?errors.summary:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
    <label className="label-style">Rating: </label>
        <TextField
        id="rating"
       name="rating"
      label="Rating"
      value={values.rating}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.rating && touched.rating}
      helperText={touched.rating?errors.rating:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style">Cast: </label>
        <TextField
        id="cast"
      name="cast"
      label="Cast"
      value={values.cast}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.cast && touched.cast}
      helperText={touched.cast?errors.cast:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style"> Language: </label>
        <TextField
        id="language"
      name="language"
      label="language"
      value={values.language}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.language && touched.language}
      helperText={touched.language?errors.language:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style"> Trailer: </label>
        <TextField
        id="trailer"
      name="trailer"
      label="Trailer"
      value={values.trailer}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.trailer && touched.trailer}
      helperText={touched.trailer?errors.trailer:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
       <Button variant="contained" type="Submit">+{action} Movie</Button>

</form>
</div> 
</div>);
}

/*Form for Language and Rating Filter */
function FilterForm({submitHandler}){
  const [languages,setLanguages]=useState([]);
  const getLanguages=()=>{
    fetch(`${API}/movies/languages`,{method:'GET',headers:{
      'x-auth-token':localStorage.getItem('token'),
     'role':localStorage.getItem('type')
   }})
    .then((res)=>res.json())
    .then((data)=>setLanguages(data))
    .catch((error)=>console.log(error));
  };
  useEffect(getLanguages,[]);
  const formValidation=({rating})=>{
    let errors={};
    if(rating>0 && rating<2){
     errors.rating="Enter a higher rating";
    }
    return errors;
  }
  const {values,errors,touched,handleSubmit,handleBlur,handleChange,resetForm}=useFormik({
    initialValues:{
      rating:0,
      language:''
    },
    validate:formValidation,
    onSubmit:submitHandler
  })

  return(
  <div>
    <h3>Filter by language or rating or both:</h3>
  <form className="form-style">
  <div className="form-style">
  <label className="filter-label-style">Language: </label>
  <TextField
    select
    id="language"
    name="language"
    label="Language"
    value={values.language}
    onChange={(event)=>{handleChange(event);handleSubmit(event);}}
    onBlur={handleBlur}
   sx={{width:{xs:'90vw',md:331}}}
  >
    {languages.map((lang,index)=><MenuItem key={index} value={lang}>{lang}</MenuItem>)}
  </TextField>
</div>
<div className="form-style">
  <label className="filter-label-style">Rating: </label>
<Rating id="rating"
name="rating"
value={values.rating}
max={10} 
onChange={(event,value)=>{values.rating=value; handleSubmit(event);}}
onBlur={handleBlur}
precision={0.5}
sx={{width:{xs:'90vw',md:331}}}
 />
<FormHelperText>{(touched.rating && errors.rating!==undefined)?errors.rating:""}</FormHelperText>
</div>
 <Button variant="contained" onClick={(event)=>{resetForm({
   values: { rating:0, language: '' },
 }); handleSubmit(event)}}>Reset</Button>

</form>
</div> )

}

/*Login Form */
function LoginForm({submitHandler}){
    
  const formValidationSchema=yup.object({
      username:yup.string().max(10,'Character limit is 10').required('Enter a username!!'),
      password:yup.string().matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})','g'),'Invalid credentials').required('Enter a password!'),
    });
    const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
      initialValues: {
        username:'',
        password:''
      },
      validationSchema:formValidationSchema,
      onSubmit:submitHandler
    })
  return (<div>
      <h2 className="heading-style">LOG IN</h2>
      <div>
      <form onSubmit={handleSubmit} className="form-style">
      <div className="form-input">
      <TextField
    id="username"
    name="username"
    label="User Name"
    value={values.username}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.username && touched.username}
    helperText={touched.username?errors.username:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}

  />
  </div>
  <div className="form-input">
      <TextField
    id="password"
    name="password"
    label="Password"
    value={values.password}
    onChange={handleChange}
    onBlur={handleBlur}
    type="password"
    error={errors.password && touched.password}
    helperText={touched.password?errors.password:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />
 </div>
 <div className="form-input">
     <Button variant="contained" type="Submit"  sx={{width:{xs:'90vw',md:331}}}>Log In</Button>
  </div>
</form>
</div> 
</div>);
}

/*SignUp Form */
function SignUpForm({submitHandler}){
    
  const formValidationSchema=yup.object({
      username:yup.string().max(10,'Character limit is 10').required('Enter a username!!'),
      password:yup.string().matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})','g'),'Invalid credentials').required('Enter a password!'),
      email:yup.string().matches(new RegExp('(.+)@(.+)$'),'Invalid Credentials').required('Enter an email!!')
    });
    const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
      initialValues: {
        username:'',
        password:'',
        usertype:'',
        email:''
      },
      validationSchema:formValidationSchema,
      onSubmit:submitHandler
    })
  return (<div>
      <h2 className="heading-style">Sign Up</h2>
      <div className='adjust-form'>
      <form onSubmit={handleSubmit} className="form-style">
      <div className="form-input">
      <TextField
    id="username"
    name="username"
    label="User Name"
    value={values.username}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.username && touched.username}
    helperText={touched.username?errors.username:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-input">
      <TextField
    id="email"
    name="email"
    label="Email"
    type="email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.email && touched.email}
    helperText={touched.email?errors.email:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-input">
      <TextField
    id="password"
    name="password"
    label="Password"
    value={values.password}
    onChange={handleChange}
    onBlur={handleBlur}
    type="password"
    error={errors.password && touched.password}
    helperText={touched.password?errors.password:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />
  </div>
 < div className="form-input">
      <TextField
    select
    id="usertype"
    name="usertype"
    label="User Type"
    value={values.usertype}
    onChange={handleChange}
    onBlur={handleBlur}
   sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  >
    {["Admin","Regular"].map((type,index)=><MenuItem key={index} value={type}>{type}</MenuItem>)}
  </TextField>
  </div>
  
  <div className='form-input'>
     <Button variant="contained" type="Submit" sx={{width:{xs:'90vw',md:331}}}>Sign Up</Button>
     </div>
</form>
</div> 
</div>);
}

/*Send OTP Form */
function SendOTPForm({submitHandler,message}){
    
  const formValidationSchema=yup.object({
      email:yup.string().matches(new RegExp('(.+)@(.+)$'),'Invalid Email').required('Enter an email!!')
    });
    const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
      initialValues: {
        email:''
      },
      validationSchema:formValidationSchema,
      onSubmit:submitHandler
    })
  return (<div>
      <h2 className="heading-style">SEND E-MAIL</h2>
      <div className='adjust-form'>
      <form onSubmit={handleSubmit} className="form-style">
  <div className="form-input">
      <TextField
    id="email"
    name="email"
    label="Email"
    type="email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.email && touched.email}
    helperText={touched.email?errors.email:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-input">
  <Button variant="contained" type="Submit" sx={{width:{xs:'90vw',md:331}}}>Send Mail</Button>
  </div>
  <p className="message-style"> {message} </p>

</form>
</div>
<BackButton/> 
</div>);
}

function ChangePassword({submitHandler,message,setShowPChange,setOMessage}){
    
  const formValidationSchema=yup.object({
       otpCode:yup.number().required('Enter an OTP Code!!'),
       password:yup.string().matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})','g'),'Invalid credentials').required('Enter a password!'),
       confirmPassword:yup.string().matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})','g'),'Invalid credentials').required('Please confirm the password!')
    });
    const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
      initialValues: {
        otpCode:'',
        password:'',
        confirmPassword:''
      },
      validationSchema:formValidationSchema,
      onSubmit:submitHandler
    })
  return (<div>
      <h2 className="heading-style">CHANGE PASSWORD</h2>
      <div className='adjust-form'>
      <form onSubmit={handleSubmit} className="form-style">
  <div className="form-input">
      <TextField
    id="otpCode"
    name="otpCode"
    label="OTP"
    value={values.otpCode}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.otpCode && touched.otpCode}
    helperText={touched.otpCode?errors.otpCode:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />

  </div>
  <div className="form-input">
      <TextField
    id="password"
    name="password"
    label="Password"
    value={values.password}
    onChange={handleChange}
    onBlur={handleBlur}
    type="password"
    error={errors.password && touched.password}
    helperText={touched.password?errors.password:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />

  </div>
  <div className="form-input">
      <TextField
    id="confirmPassword"
    name="confirmPassword"
    label="Confirm Password"
    value={values.confirmPassword}
    onChange={handleChange}
    onBlur={handleBlur}
    type="password"
    error={errors.confirmPassword && touched.confirmPassword}
    helperText={touched.confirmPassword?errors.confirmPassword:""}
    sx={{backgroundColor:'lavender',width:{xs:'90vw',md:331}}}
  />
  
  </div>
  <div className='form-input'>
  <Button variant="contained" type="Submit" sx={{width:{xs:'90vw',md:331}}}> Change Password</Button>
  </div>
  <p className="message-style"> {message}  </p>
</form>
</div> 
<Button variant="contained" color="primary" startIcon={<ArrowBackIosIcon />} onClick={()=>{setShowPChange(false);setOMessage("");}}>
         Back
      </Button>
</div>);
}

export {FormComponent,FilterForm,LoginForm,SignUpForm,SendOTPForm,ChangePassword};