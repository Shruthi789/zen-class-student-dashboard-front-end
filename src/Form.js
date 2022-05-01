import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {BackButton} from './BackButton.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function FormComponent({initialValues,submitHandler}){
    
  const formValidationSchema=yup.object({
      name:yup.string().required('Enter a name!!'),
      completion:yup.number().min(4,'Enter a higher value').required('Enter a completion percentage!'),
      attendance:yup.number().min(10,'Enter a higher value').required('Enter an attendance percentage!'),
      codekata:yup.number().min(50,'Enter a higher value').required('Enter the number of codekata sums!'),
      webkata:yup.number().min(50,'Enter a higher value').required('Enter the number of webkata problems!'),
      pendingTasks:yup.number().min(0).required('Enter the no of pending tasks!'),
      submittedTasks:yup.number().min(5,'Enter a higher value').required('Enter the number of submitted tasks!')
    });
    const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
      initialValues: initialValues,
      validationSchema:formValidationSchema,
      onSubmit:submitHandler
    })
  return (<div>
      <h2 className="heading-style">EDIT STUDENT INFORMATION</h2>
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
      <label className="label-style">Completion: </label>
      <TextField
    id="completion"
    name="completion"
    label="Completion"
    value={values.completion}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.completion && touched.completion}
    helperText={touched.completion?errors.completion:""}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-style">
    <label className="label-style">Attendance: </label>
      <TextField
      id="attendance"
    name="attendance"
    label="Attendance"
    value={values.attendance}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.attendance && touched.attendance}
    helperText={touched.attendance?errors.attendance:""}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-style">
    <label className="label-style">Codekata: </label>
      <TextField
      id="codekata"
    name="codekata"
    label="codekata"
    value={values.codekata}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.codekata && touched.codekata}
    helperText={touched.codekata?errors.codekata:""}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-style">
    <label className="label-style">Webkata: </label>
      <TextField
      id="webkata"
    name="webkata"
    label="Webkata"
    value={values.webkata}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.webkata && touched.webkata}
    helperText={touched.webkata?errors.webkata:""}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-style">
  <label className="label-style">Pending Tasks: </label>
      <TextField
      id="pendingTasks"
     name="pendingTasks"
    label="pendingTasks"
    value={values.pendingTasks}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.pendingTasks && touched.pendingTasks}
    helperText={touched.pendingTasks?errors.pendingTasks:""}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
  <div className="form-style">
   <label className="label-style">Submitted Tasks: </label>
      <TextField
      id="submittedTasks"
    name="submittedTasks"
    label="submittedTasks"
    value={values.submittedTasks}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.submittedTasks && touched.submittedTasks}
    helperText={touched.submittedTasks?errors.submittedTasks:""}
    sx={{width:{xs:'90vw',md:331}}}
  />
  </div>
  
     <Button variant="contained" type="Submit">+Edit Student</Button>

</form>
</div> 
</div>);
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

export {FormComponent,LoginForm,SignUpForm,SendOTPForm,ChangePassword};