import React from 'react'
import {Toolbar, Typography, Avatar} from '@mui/material';
import { Link} from 'react-router-dom';
import computerLogo from '../../../img/logo.png';

function Logo() {
    return (
        <Toolbar>
            <Avatar component={Link} to="/" src={computerLogo} alt="IMG BOOKING" id="bookingLogo" />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                    ml: 2,
                    mr: 2,
                    display: { sx: "none", md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                SpaceInfo
            </Typography>
        </Toolbar>
    )
}

export default Logo