import React, { useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import wallpaperImg from '../../img/wallpaper_lap.jpeg';
import { AUTH_ACTIONS, AuthState } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Email_Password_Verifcation } from '../../utils/utilFunctions';


const theme = createTheme();

function Login() {
    const [credentialsUser, setCredentialsUser] = useState({
        email: undefined,
        password: undefined,
    });
    const errorEmail = useRef(null);
    const errorPassword = useRef(null);

    const {user, loading, error, authDispatch } = AuthState();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentialsUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const dataToBack = {
            email: data.get('email'),
            password: data.get('password')
        }

        console.log(dataToBack);

        const fetch_error = Email_Password_Verifcation(dataToBack.email, dataToBack.password, errorEmail, errorPassword)
        if(fetch_error){
            return
        }

        authDispatch({type: AUTH_ACTIONS.START})

        try {
            const responce_api = await axios.post("/auth/login", credentialsUser);
            authDispatch({ type: AUTH_ACTIONS.SUCCESS, payload: responce_api.data.details });
            navigate('/Profile');
        } catch (error) {
            console.log(error.response.data.message)
            authDispatch({ type: AUTH_ACTIONS.ECHEC, payload: error.response.data });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${wallpaperImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <Typography variant='caption' ref={errorEmail} sx={{color:"red"}}></Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Typography variant='caption'  ref={errorPassword} sx={{color:"red"}}></Typography><br/>
                            {error && <span style={{color:"red", fontWeight:'bold'}}>{error.message}</span>}
                            <br/>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled = {loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Login