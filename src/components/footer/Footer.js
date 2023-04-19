import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Box sx={{ bgcolor: '#fff', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                &#169; Space-Info 2023
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                component="p"
            >
                We Make You an Offre You Can't Refuse
            </Typography>

        </Box>

    )
}

export default Footer                                  