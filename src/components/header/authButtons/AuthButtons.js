import React from 'react'
import { Box, Button } from '@mui/material';
import { Link} from 'react-router-dom';
import { AUTH_ACTIONS, AuthState } from '../../../context/AuthContext';

function AuthButtons({navigate}) {
    const { user, authDispatch } = AuthState();
    return (
        <Box sx={{ mt: 2, display: { xs: 'none', md: 'none', lg: "flex" } }}>
            {user ?
                <React.Fragment>
                    <Button component={Link} to='/' color="error" variant='outlined' onClick={() => authDispatch({ type: AUTH_ACTIONS.LOGOUT })} sx={{ fontWeight: "bold" }} >Logout</Button>
                    <Button component={Link} to="/profile" color="success" variant='outlined' sx={{ fontWeight: "bold", ml: 2 }} >Profile</Button>
                </React.Fragment>
                :
                <React.Fragment>
                    <Button variant='contained' color="primary" onClick={() => navigate("/login")} >Login</Button>
                    <Button variant='outlined' color="primary" onClick={() => navigate("/register")} sx={{ ml: 2 }}>Register</Button>
                </React.Fragment>
            }
        </Box>
    )
}

export default AuthButtons