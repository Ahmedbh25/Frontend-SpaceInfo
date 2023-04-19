
import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
function Loading() {
    return (
            <Box sx={{height:'200px', width: '40%', bgcolor: 'rgba(0, 0, 0, 0.9)', m:"auto", my:'15%',borderRadius:2 }}>
                <Box sx={{width:'40%', m:"auto", pt:"60px"}} >
                    <Typography variant="h6" sx={{color : "white"}}>Loading For Data ...</Typography>
                    <CircularProgress color="secondary" />
                </Box>
            </Box>
    )
}

export default Loading