import { Switch,Route,Redirect} from "react-router-dom";
import {Home} from './Dashboard/Home';
import {Login} from './Users/Login';
import {SignUp} from './Users/SignUp';
import {ForgotPassword} from './Users/ForgotPassword';
import {WrongURL} from './WrongURL.js';
import Paper from '@mui/material/Paper';
import { ThemeProvider,createTheme} from '@mui/material/styles';

const colorTheme = createTheme({
  palette: {
    warning: {
      main: "#F5F5DC"
    }
  },
  breakpoints: {
    values: {
      xs:320,
      md:768
  }
}
});

function App() {
  
  return (
    <ThemeProvider theme={colorTheme}>
    <Paper style={{backgroundImage:"url('https://wallpapercave.com/wp/BMrmUGk.jpg')",minHeight:"100vh",borderRadius:"0px"}}>
       <Switch>
        <Route exact path="/"><Login/></Route>
        <Route path="/dashboard"><Home/></Route>
        <Route path="/students">
          <Redirect to="/dashboard"/>
        </Route>
       <Route path="/signup"><SignUp/></Route>
        <Route path="/forgotpassword">
       <ForgotPassword/>
        </Route>
        <Route path="**">
       <WrongURL/>
        </Route>
       </Switch>
       </Paper>
       </ThemeProvider>
  );
}


export default App;

