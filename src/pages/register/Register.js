import React, { useRef, useState } from 'react'
import { Typography, TextField, Grid, Container, Paper, Button, Box } from '@mui/material';
import { RegisterState } from '../../context/RegisterContext';
import { Email_Password_Verifcation, Register_Verification } from '../../utils/utilFunctions';
import axios from 'axios';
import { AUTH_ACTIONS, AuthState } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const GridOptions = [
    { name: "email", lab: "Email" },
    { name: "password", lab: "Password" },
    { name: "username", lab: "Username" },
    { name: "first_name", lab: "First name" },
    { name: "last_name", lab: "Last name" },
    { name: "address", lab: "address" },
    { name: "city", lab: "City" },
    { name: "state", lab: "State" },
    { name: "country", lab: "Country" },
    { name: "phone", lab: "Phone" }
]

function Register() {
    const { FieldState, DispatchField} = RegisterState();
    const {user,
        loading,
        error,
        authDispatch}  = AuthState()
    
    const navigate = useNavigate();
    const errorUsername = useRef(null);
    const errorEmail = useRef(null);
    const errorPassword = useRef(null);
    const errorFirstn = useRef(null);
    const errorLastn = useRef(null);
    const errorAddress = useRef(null);
    const errorCity = useRef(null);
    const errorState = useRef(null);
    const errorCountry = useRef(null);
    const errorPhone = useRef(null);

    const refs = [
        errorEmail,
        errorPassword,
        errorUsername,
        errorFirstn,
        errorLastn,
        errorAddress,
        errorCity,
        errorState,
        errorCountry,
        errorPhone,
    ]
    console.log(FieldState)

    const handleRegister = async(e) => {
        e.preventDefault();
        const fetch_error = Register_Verification(FieldState, errorUsername, errorEmail, errorPassword, errorFirstn, errorLastn, errorAddress, errorCity, errorState, errorCountry, errorPhone);
        if (fetch_error) {
            return
        }
        authDispatch({type : AUTH_ACTIONS.START})
        try{
            const add_user = await axios.post('/auth/register', FieldState);
            console.log(add_user)
            authDispatch({type : AUTH_ACTIONS.SUCCESS, payload: add_user.data});
            console.log(add_user.data)
            navigate('/Profile');
        }catch(error){
            console.log(error.response.data.message);
            authDispatch({type : AUTH_ACTIONS.ECHEC, payload: error.response.data.message});
        }
    }
    return (
        <Container component="main" maxWidth="sm" sx={{ my: 8 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, bgcolor: '#F8F8F8' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 5 }}>
                    Register :
                </Typography>
                <Box component="form" noValidate onSubmit={handleRegister}>
                    <Grid container spacing={3} >
                        {GridOptions.map((option, index) => (
                            <Grid item xs={12} sm={6} sx={{ mb: 1 }} key={option.name}>
                                <TextField
                                    required
                                    id={option.name}
                                    name={option.name}
                                    label={option.lab}
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => { DispatchField({ type: option.name, payload: e.target.value }) }}
                                />
                                <Typography variant='caption' ref={refs[index]} sx={{ color: "red" }}></Typography>
                            </Grid>
                        ))
                        }
                        {error && <Typography variant='body2' sx={{color:"red", textAlign:"center", ml:3}}>Email or Username are Reserved For Know Try Somthing Else.</Typography>}
                        <Button disabled={loading} type="submit" variant='contained' sx={{ width: "30%", m: 'auto', mt: 5 }}>Register</Button>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default Register