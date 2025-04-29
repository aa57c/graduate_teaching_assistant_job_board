import React, {useState, useEffect, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../actions/authActions';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import store from "../store"
import { ElevatorSharp } from '@mui/icons-material';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          UMKC GTA Job Postings
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>

    );
}

const theme = createTheme();


function Login(){
    const location = useLocation();
    const history = useHistory();
    const posting = location.state?.posting;
    const className = location.state?.className;
    const sectionID = location.state?.sectionID;

    //state for authentication (comes from Redux)
    const auth = useSelector(state => state.auth);
    //state for if the user is an admin
    //const isAdmin = useSelector(state => state.auth.isAdmin);
    //state for errors if incorrect email/password is entered (comes from Redux)
    const Errors = useSelector(state => state.errors);

    //dispatches action (logged in, logged out, set current user, etc)

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});





    useEffect(() => {      
      if(auth.isAuthenticated && posting != null && className != null && sectionID != null){
        history.push({
          pathname: '/postings/submission-portal',
          state: {
              posting: posting,
              className: className,
              sectionID: sectionID
          }
        });
      }
      else if(auth.isAuthenticated){
        history.push('/');
  
      }
      // Enter another condition here where user is authenticated BUT the user is an admin, so that the admin view is pulled up
      else if(Errors){
      setErrors(Errors);

     }
    }, [auth.isAuthenticated, Errors, history, posting, className, sectionID]);


    function findAdmin(users){
      let adminFound = false;
      for (let index = 0; index < users.length; index++) {
        if(users.at(index).email === email && users.at(index).isAdmin){
          adminFound = true;
          break;
        }
          
      }
      if(adminFound){
        console.log("user is an admin!");
        const userData = {
          email: email,
          password: password,
          isAdmin: adminFound
        }
        store.dispatch(loginUser(userData, dispatch));
      }
      else if(!adminFound){
        console.log("user is a student");
        const userData = {
          email: email,
          password: password,
          isAdmin: adminFound
        } 
        store.dispatch(loginUser(userData, dispatch));

      }
      

      
    }

    async function getUsers(){
      const response = await fetch('https://job-board-backend-yq3b.onrender.com/users');
      if(response.ok){
        let users = await response.json();
        findAdmin(users);
      }
    }







    function handleSubmit(){
      getUsers();
        
    }

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email || errors.emailnotfound}
            onError={(event) => setErrors({...errors, [event.target.name]: event.target.error})}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <span style={{color: 'red'}}>
              {errors.email || errors.emailnotfound}
            </span>
            <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password || errors.passwordincorrect}
            onError={(event) => setErrors({...errors, [event.target.name]: event.target.error})}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <span style={{color: 'red'}}>
              {errors.password || errors.passwordincorrect}
            </span>
            <br></br>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Login;
