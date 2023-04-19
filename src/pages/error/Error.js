import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate();
    return (
        <Container sx={{ textAlign: 'center', my: 10 }}>
            <Typography variant='h1' sx={{ color: "red", fontWeight: "bold",my:2 }}>404</Typography>
            <Typography variant='h6' sx={{my:2}} >UH... OH...</Typography>
            <Typography variant='body1' sx={{my:1}} >The Resource requested for could not be found on this Server.</Typography>
            <Button variant='contained' sx={{my:2}} onClick={()=>navigate("/")}>Go Home</Button>
        </Container>
    )
}

export default Error